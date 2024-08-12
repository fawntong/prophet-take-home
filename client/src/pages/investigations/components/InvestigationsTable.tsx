import {Badge, BadgeProps, Table} from "@radix-ui/themes";
import React from "react";
import {InvestigationSeverity, useFetchInvestigations} from "../../../lib/fetch-investigations";
import {UserAvatar} from "../../../components/UserAvatar";
import {SeverityBadge} from "./SeverityBadge";
import {DeterminationBadge} from "./DeterminationBadge";
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons'

export const InvestigationsTable: React.FC = () => {
    const {investigations} = useFetchInvestigations();
    return (
            <Table.Root className="relative h-[80vh] border" layout="auto">
                <Table.Header>
                    <Table.Row className="bg-red-50">
                        {/* TODO: better order for columns */}
                        <Table.ColumnHeaderCell className="sticky top-0 z-10 !bg-white">ID</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="sticky top-0 z-10 !bg-white">Name</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="sticky top-0 z-10 !bg-white">Severity</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="sticky top-0 z-10 !bg-white">Source</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="sticky top-0 z-10 !bg-white">Determination</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="sticky top-0 z-10 !bg-white">Analyst</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="sticky top-0 z-10 !bg-white">Alert fired</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="sticky top-0 z-10 !bg-white">Last updated</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="sticky top-0 z-10 !bg-white">Ready for review</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {investigations.map(inv => (
                        <Table.Row key={inv.id} className="hover:bg-gray-50">
                            <Table.Cell>{inv.id}</Table.Cell>
                            <Table.Cell className="font-semibold">{inv.title}</Table.Cell>
                            <Table.Cell><SeverityBadge severity={inv.severity}/></Table.Cell>
                            <Table.Cell>{inv.source}</Table.Cell>
                            <Table.Cell><DeterminationBadge determination={inv.determination} /></Table.Cell>
                            <Table.Cell>{inv.analystAssigned ? <UserAvatar userName={inv.analystAssigned}/> : <>&#8212;</>}</Table.Cell>
                            <Table.Cell>{inv.alertFiredTimestamp.toLocaleString()}</Table.Cell>
                            <Table.Cell>{inv.lastUpdatedTimestamp.toLocaleString()}</Table.Cell>
                            <Table.Cell>{inv.readyForReview ? <CheckIcon /> : <Cross2Icon />}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
    )
}