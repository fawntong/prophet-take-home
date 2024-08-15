import { Table } from "@radix-ui/themes";
import React from "react";
import { UserAvatar } from "../../../components/UserAvatar";
import { SeverityBadge } from "./SeverityBadge";
import { DeterminationBadge } from "./DeterminationBadge";
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import { InvestigationSortDirection } from "../lib/sort-investigations";
import { SortButton } from "../../../components/SortButton";
import { Investigation } from "../lib/investigation-type";

interface Props {
  investigations: Investigation[];
  sortDirection: InvestigationSortDirection;
  updateSortDirection: (newSortDirection: InvestigationSortDirection) => void;
}

const COLUMNS: { field: keyof Investigation; prettyName: string }[] = [
  { field: "id", prettyName: "ID" },
  { field: "title", prettyName: "Name" },
  { field: "severity", prettyName: "Severity" },
  { field: "source", prettyName: "Source" },
  { field: "determination", prettyName: "Determination" },
  { field: "analystAssigned", prettyName: "Analyst" },
  { field: "alertFiredTimestamp", prettyName: "Fired" },
  { field: "lastUpdatedTimestamp", prettyName: "Updated" },
  { field: "readyForReview", prettyName: "Ready for review" },
];

export const InvestigationsTable: React.FC<Props> = ({
  investigations,
  sortDirection,
  updateSortDirection,
}) => {
  return (
    <Table.Root className="relative h-[80vh] border" layout="auto">
      <Table.Header>
        <Table.Row className="bg-red-50">
          {/* TODO: better order for columns */}
          {/* TODO: refactor */}
          {COLUMNS.map(({ field, prettyName }) => {
            const sortDirectionForColumn =
              sortDirection.field === field ? sortDirection.direction : "none";
            return (
              <Table.ColumnHeaderCell
                key={field}
                className="sticky top-0 z-10 !bg-white"
              >
                <div className="flex items-start gap-1">
                  <span className="min-h-6 flex items-center">
                    {prettyName}
                  </span>
                  <SortButton
                    sortDirection={sortDirectionForColumn}
                    updateSortDirection={(direction) =>
                      updateSortDirection({ field, direction })
                    }
                  />
                </div>
              </Table.ColumnHeaderCell>
            );
          })}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {investigations.map((inv) => (
          // TODO: make this match with column order
          <Table.Row key={inv.id} className="hover:bg-gray-50">
            <Table.Cell>{inv.id}</Table.Cell>
            <Table.Cell className="font-semibold">{inv.title}</Table.Cell>
            <Table.Cell>
              <SeverityBadge severity={inv.severity} />
            </Table.Cell>
            <Table.Cell>{inv.source}</Table.Cell>
            <Table.Cell>
              <DeterminationBadge determination={inv.determination} />
            </Table.Cell>
            <Table.Cell>
              {inv.analystAssigned ? (
                <UserAvatar userName={inv.analystAssigned} />
              ) : (
                <>&#8212;</>
              )}
            </Table.Cell>
            <Table.Cell>{inv.alertFiredTimestamp.toLocaleString()}</Table.Cell>
            <Table.Cell>{inv.lastUpdatedTimestamp.toLocaleString()}</Table.Cell>
            <Table.Cell>
              {inv.readyForReview ? <CheckIcon /> : <Cross2Icon />}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
