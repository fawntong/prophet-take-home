import React from "react";
import {InvestigationsTable} from "./components/InvestigationsTable";
import {PageWrapper} from "../../components/PageWrapper";

export const InvestigationsPage: React.FC = () => {
    return (
        <PageWrapper pageHeading="Investigations">
            <InvestigationsTable />
        </PageWrapper>
    )
}