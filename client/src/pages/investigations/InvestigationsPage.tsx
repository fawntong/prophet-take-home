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

export const InvestigationsPage: React.FC = () => {
  const [filters, setFilters] = useState<InvestigationFilters>({});
  const [sortDirection, setSortDirection] =
    useState<InvestigationSortDirection>({ field: "id", direction: "none" });
  const [page, setPage] = useState(1);

  const { investigations: fetchedInvestigations } = useFetchInvestigations({
    filters,
    page,
  });
  const sortedInvestigations = useSortInvestigations(
    fetchedInvestigations,
    sortDirection,
  );

  return (
    <PageWrapper pageHeading="Investigations">
      <div className="mb-4">
        <InvestigationFiltersBar
          activeFilters={filters}
          updateFilters={setFilters}
        />
      </div>
      <InvestigationsTable
        investigations={sortedInvestigations}
        sortDirection={sortDirection}
        updateSortDirection={setSortDirection}
      />
      <div className="mt-2 flex justify-end w-full">
        <PaginationButtons
          currentPage={page}
          pageSize={INVESTIGATIONS_PAGE_SIZE}
          entityName="investigations"
          decrementPage={() => setPage(page - 1)}
          incrementPage={() => setPage(page + 1)}
        />
      </div>
    </PageWrapper>
  );
};
