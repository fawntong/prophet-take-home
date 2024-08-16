import axios from "axios";
import { useEffect, useState } from "react";
import { useImmer } from "use-immer";
import { FetchState, INITIAL_FETCH_STATE } from "../../../lib/fetch-utils";
import {
  Investigation,
  InvestigationDetermination,
  InvestigationSeverity,
  InvestigationSource,
} from "./investigation-type";

export interface InvestigationFilters {
  source?: string;
  severity?: InvestigationSeverity;
  id?: number;
  determination?: InvestigationDetermination;
}

interface FetchData extends FetchState {
  investigations: Investigation[];
  page: number;
  incrementPage: () => Promise<void>;
  decrementPage: () => Promise<void>;
}

export const INVESTIGATIONS_PAGE_SIZE = 10;

export const useFetchInvestigations = (
  filters: InvestigationFilters,
): FetchData => {
  const [investigations, setInvestigations] = useState<Investigation[]>([]);
  const [page, setPage] = useState<number>(1);
  const [fetchState, setFetchState] = useImmer<FetchState>(INITIAL_FETCH_STATE);

  const fetchInvestigations = async (
    args: { filters: InvestigationFilters; page: number },
    callbacks?: {
      onSuccess?: (fetchedInvestigations: Investigation[]) => void;
      onError?: (error: unknown) => void;
    },
  ) => {
    try {
      const response = await axios.get("/investigations", {
        params: { ...args.filters, page: args.page },
      });
      const parsedInvestigations = parseData(response.data);
      callbacks?.onSuccess?.(parsedInvestigations);
    } catch (e) {
      callbacks?.onError?.(e);
      // TODO (prod): Send this to a logging service like Sentry rather than the console
      console.error("ERROR:", e);
    }
  };

  // Fetch the investigations when the page loads or whenever the filters change.
  // Since we're refetching the entire list of investigations, reset all state including the page number.
  useEffect(() => {
    setFetchState(INITIAL_FETCH_STATE);
    setPage(1);
    void fetchInvestigations(
      {
        filters,
        page: 1,
      },
      {
        onSuccess: (fetchedInvestigations) => {
          setInvestigations(fetchedInvestigations);
        },
        onError: () => {
          setFetchState((draft) => {
            // Set a generic error message to display to users
            draft.loadingError =
              "An error occurred while fetching investigations. Try reloading the page.";
          });
        },
      },
    );
    setFetchState((draft) => {
      draft.loading = false;
    });
  }, [filters, setFetchState]);

  const updatePage = async (newPage: number) => {
    setFetchState((draft) => {
      draft.fetchingMore = true;
    });
    await fetchInvestigations(
      {
        filters,
        page: newPage,
      },
      {
        onSuccess: (fetchedInvestigations) => {
          if (fetchedInvestigations.length > 0) {
            // Only update the page in state if the pagination fetch was successful
            setPage(newPage);
            setInvestigations(fetchedInvestigations);
          }
        },
        onError: () => {
          setFetchState((draft) => {
            draft.fetchingMoreError =
              "An error occurred while fetching investigations. Please try again.";
          });
        },
      },
    );
    setFetchState((draft) => {
      draft.fetchingMore = false;
    });
  };

  return {
    ...fetchState,
    investigations,
    page,
    incrementPage: () => updatePage(page + 1),
    decrementPage: () => updatePage(page - 1),
  };
};

const parseData = (data: unknown): Investigation[] => {
  if (!Array.isArray(data)) {
    throw new Error("Expected data to be an array");
  }

  // TODO (prod): Add validation to ensure the server data matches the expected format.
  //  Skipped for now since we can reasonably make that assumption.
  return data.map((item) => ({
    id: item.id,
    title: item.title,
    source: item.source as InvestigationSource,
    alertFiredTimestamp: new Date(item.alertFiredTimestamp),
    lastUpdatedTimestamp: new Date(item.lastUpdatedTimestamp),
    severity: item.severity as InvestigationSeverity,
    analystAssigned: item.analystAssigned,
    determination: item.determination as InvestigationDetermination,
    readyForReview: item.readyForReview === "Yes",
  }));
};
