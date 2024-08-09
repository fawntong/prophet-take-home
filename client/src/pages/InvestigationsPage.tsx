import React from "react";
import {fetchInvestigations} from "../lib/fetch-utils";

export const InvestigationsPage: React.FC = () => {
    void fetchInvestigations();
    return (
        <div>investigations</div>
    )
}