import React, {useState} from "react";
import {InvestigationsTable} from "./components/InvestigationsTable";
import {PageWrapper} from "../../components/PageWrapper";
import {InvestigationFilters,
    useFetchInvestigations
} from "./lib/fetch-investigations";
import {InvestigationFiltersBar} from "./components/InvestigationFiltersBar";

export const InvestigationsPage: React.FC = () => {
    const [filters, setFilters] = useState<InvestigationFilters>({});
    console.log("FILTERS", filters);

    const {investigations} = useFetchInvestigations(filters);

    return (
        <PageWrapper pageHeading="Investigations">
            <div className="mb-4">
                <InvestigationFiltersBar activeFilters={filters} updateFilters={setFilters}/>
            </div>
            <InvestigationsTable investigations={investigations}/>
        </PageWrapper>
    )
}