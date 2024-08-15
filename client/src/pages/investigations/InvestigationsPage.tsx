import React, { useState } from "react";
import { InvestigationsTable } from "./components/InvestigationsTable";
import { PageWrapper } from "../../components/PageWrapper";
import {
  InvestigationFilters,
  useFetchInvestigations,
} from "./lib/fetch-investigations";
import { InvestigationFiltersBar } from "./components/InvestigationFiltersBar";
import {
  InvestigationSortDirection,
  useSortInvestigations,
} from "./lib/sort-investigations";

export const InvestigationsPage: React.FC = () => {
  const [filters, setFilters] = useState<InvestigationFilters>({});
  const [sortDirection, setSortDirection] =
    useState<InvestigationSortDirection>({ field: "id", direction: "none" });

  const { investigations: fetchedInvestigations } =
    useFetchInvestigations(filters);
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
    </PageWrapper>
  );
};
