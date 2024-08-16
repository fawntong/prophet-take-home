import React, { useState } from "react";
import { InvestigationsTable } from "./components/InvestigationsTable";
import { PageWrapper } from "../../components/PageWrapper";
import {
  InvestigationFilters,
  INVESTIGATIONS_PAGE_SIZE,
  useFetchInvestigations,
} from "./lib/fetch-investigations";
import { InvestigationFiltersBar } from "./components/InvestigationFiltersBar";
import {
  InvestigationSortDirection,
  useSortInvestigations,
} from "./lib/sort-investigations";
import { PaginationButtons } from "../../components/PaginationButtons";
import { ErrorCallout } from "../../components/ErrorCallout";

export const InvestigationsPage: React.FC = () => {
  const [filters, setFilters] = useState<InvestigationFilters>({});
  const [sortDirection, setSortDirection] =
    useState<InvestigationSortDirection>({ field: "id", direction: "none" });

  const {
    investigations: fetchedInvestigations,
    page,
    incrementPage,
    decrementPage,
    loading,
    loadingError,
    fetchingMoreError,
  } = useFetchInvestigations(filters);
  const sortedInvestigations = useSortInvestigations(
    fetchedInvestigations,
    sortDirection,
  );

  if (loadingError) {
    return (
      <PageWrapper pageHeading="Investigations">
        <ErrorCallout errorMessage={loadingError} />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper pageHeading="Investigations">
      <ErrorCallout errorMessage={fetchingMoreError} closeable={true} />
      <div className="mb-4">
        <InvestigationFiltersBar
          activeFilters={filters}
          updateFilters={setFilters}
          disabled={loading}
        />
      </div>
      <InvestigationsTable
        investigations={sortedInvestigations}
        loading={loading}
        sortDirection={sortDirection}
        updateSortDirection={setSortDirection}
      />
      {!loading && (
        <div className="mt-4 flex justify-end w-full">
          <PaginationButtons
            currentPage={page}
            pageSize={INVESTIGATIONS_PAGE_SIZE}
            numDisplayed={sortedInvestigations.length}
            entityName="investigations"
            incrementPage={incrementPage}
            decrementPage={decrementPage}
          />
        </div>
      )}
    </PageWrapper>
  );
};
