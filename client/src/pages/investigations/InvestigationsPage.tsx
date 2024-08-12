import {Button, Flex, Heading, Table, Text} from "@radix-ui/themes";
import React from "react";
import {useFetchInvestigations} from "../../lib/fetch-investigations";
import {InvestigationsTable} from "./components/InvestigationsTable";

export const InvestigationsPage: React.FC = () => {
    return (
        <>
            <Heading>Investigations</Heading>
            <InvestigationsTable />
        </>
    )
}