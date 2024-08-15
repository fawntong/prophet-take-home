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

export const INVESTIGATIONS_PAGE_SIZE = 10;

export const useFetchInvestigations = (args: {
  page: number;
  filters?: InvestigationFilters;
}): {
  investigations: Investigation[];
  fetchState: FetchState;
} => {
  const { filters, page } = args;

  const [investigations, setInvestigations] = useState<Investigation[]>([]);
  const [fetchState, setFetchState] = useImmer<FetchState>(INITIAL_FETCH_STATE);
  console.log(fetchState);

  const fetchInvestigations = () => {
    try {
      axios
        .get("/investigations", {
          params: { ...filters, page },
        })
        .then((data) => {
          // TODO: do something with status
          // TODO: check bad response case
          // TODO: check what happens if something goes wrong while parsing
          setInvestigations(parseData(data.data));
          setFetchState((draft) => {
            draft.loading = false;
          });
        })
        .catch((e) => {
          // TODO
          setFetchState((draft) => {
            draft.error = e;
          });
        });
    } catch (e) {
      setFetchState((draft) => {
        draft.error =
          "An error occurred while fetching investigations. Please try again.";
      });
      // TODO (prod): Send this to a logging service like Sentry rather than the console
      console.error("ERROR", e);
    }
  };

  useEffect(() => {
    setFetchState(INITIAL_FETCH_STATE);
    fetchInvestigations();
    // TODO: set up subscription? observable?
  }, [filters, page]);

  return {
    investigations,
    fetchState,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseData = (data: any): Investigation[] => {
  if (!Array.isArray(data)) {
    throw new Error("Expected array");
  }

  // TODO: verify types and fields?
  return data.map((item) => ({
    id: item.id,
    title: item.title,
    source: parseSource(item.source),
    alertFiredTimestamp: new Date(item.alertFiredTimestamp), // TODO: verify these dates are correct
    lastUpdatedTimestamp: new Date(item.lastUpdatedTimestamp),
    severity: parseSeverity(item.severity),
    analystAssigned: item.analystAssigned,
    determination: parseDetermination(item.determination),
    readyForReview: item.readyForReview === "Yes", // TODO: check for no?
  }));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseSeverity = (sev: any): InvestigationSeverity => {
  if (typeof sev !== "string") {
    throw new Error("Expected severity to be a string but got " + typeof sev);
  }

  const parsedSev = Object.values(InvestigationSeverity).find((s) => s === sev);

  if (!parsedSev) {
    throw new Error("Could not parse severity");
  }

  return parsedSev;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDetermination = (det: any): InvestigationDetermination => {
  if (typeof det !== "string") {
    throw new Error(
      "Expected determination to be a string but got " + typeof det,
    );
  }

  const parsedDet = Object.values(InvestigationDetermination).find(
    (d) => d === det,
  );

  if (!parsedDet) {
    throw new Error("Could not parse determination");
  }

  return parsedDet;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseSource = (source: any): InvestigationSource => {
  if (typeof source !== "string") {
    throw new Error("Expected source to be a string but got " + typeof source);
  }

  const parsedSource = Object.values(InvestigationSource).find(
    (s) => s === source,
  );

  if (!parsedSource) {
    throw new Error("Could not parse source");
  }

  return parsedSource;
};
