import {Button, Flex, Table, Text} from "@radix-ui/themes";
import React from "react";
import {useFetchInvestigations} from "../../../lib/fetch-investigations";

export const InvestigationsTable: React.FC = () => {
    const {investigations} = useFetchInvestigations();
    return (
            <Table.Root className="relative h-[100vh]" layout="auto">
                <Table.Header>
                    <Table.Row className="bg-red-50">
                        {/* TODO: better order for columns */}
                        <Table.ColumnHeaderCell className="sticky top-0 z-10 !bg-white">ID</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="sticky top-0 z-10 !bg-white">Name</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="sticky top-0 z-10 !bg-white">Source</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="sticky top-0 z-10 !bg-white">Severity</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="sticky top-0 z-10 !bg-white">Determination</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="sticky top-0 z-10 !bg-white">Analyst</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="sticky top-0 z-10 !bg-white">Alert fired</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="sticky top-0 z-10 !bg-white">Last updated</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="sticky top-0 z-10 !bg-white">Ready for review</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {investigations.map(inv => (
                        <Table.Row>
                            <Table.Cell>{inv.id}</Table.Cell>
                            <Table.Cell>{inv.title}</Table.Cell>
                            <Table.Cell>{inv.source}</Table.Cell>
                            <Table.Cell>{inv.severity}</Table.Cell>
                            <Table.Cell>{inv.determination}</Table.Cell>
                            <Table.Cell>{inv.analystAssigned}</Table.Cell>
                            <Table.Cell>{inv.alertFiredTimestamp.toString()}</Table.Cell>
                            <Table.Cell>{inv.lastUpdatedTimestamp.toString()}</Table.Cell>
                            <Table.Cell>{inv.readyForReview}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
    )
}