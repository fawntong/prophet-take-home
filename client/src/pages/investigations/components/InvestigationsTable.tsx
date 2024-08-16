import { Spinner, Table, Text } from "@radix-ui/themes";
import React from "react";
import { UserAvatar } from "../../../components/UserAvatar";
import { SeverityBadge } from "./SeverityBadge";
import { DeterminationBadge } from "./DeterminationBadge";
import { CheckCircledIcon, Cross2Icon } from "@radix-ui/react-icons";
import { InvestigationSortDirection } from "../lib/sort-investigations";
import { SortButton } from "../../../components/SortButton";
import { Investigation } from "../lib/investigation-type";

interface Props {
  investigations: Investigation[];
  loading: boolean;
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
  loading,
  sortDirection,
  updateSortDirection,
}) => {
  return (
    <Table.Root className="shadow-sm" variant="surface" layout="auto">
      <Table.Header>
        <Table.Row>
          {COLUMNS.map(({ field, prettyName }) => {
            const sortDirectionForColumn =
              sortDirection.field === field ? sortDirection.direction : "none";
            return (
              <Table.ColumnHeaderCell key={field}>
                <div className="flex items-start gap-1">
                  <span className="min-h-6 flex items-center">
                    {prettyName}
                  </span>
                  <SortButton
                    sortDirection={sortDirectionForColumn}
                    updateSortDirection={(direction) =>
                      updateSortDirection({ field, direction })
                    }
                    disabled={loading}
                  />
                </div>
              </Table.ColumnHeaderCell>
            );
          })}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {loading && (
          <Table.Row>
            <Table.Cell colSpan={COLUMNS.length}>
              <Spinner size="3" className="m-auto" />
            </Table.Cell>
          </Table.Row>
        )}

        {investigations.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={COLUMNS.length} className="text-center">
              <Text>No investigations were found</Text>
            </Table.Cell>
          </Table.Row>
        )}

        {investigations.map((inv) => (
          <Table.Row key={inv.id} className="hover:bg-gray-50" align="center">
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
                <div className="flex gap-2 items-center">
                  <UserAvatar userName={inv.analystAssigned} />
                  {inv.analystAssigned}
                </div>
              ) : (
                // em dash
                <>&#8212;</>
              )}
            </Table.Cell>
            <Table.Cell>{inv.alertFiredTimestamp.toLocaleString()}</Table.Cell>
            <Table.Cell>{inv.lastUpdatedTimestamp.toLocaleString()}</Table.Cell>
            <Table.Cell>
              {inv.readyForReview ? (
                <CheckCircledIcon
                  width="18"
                  height="18"
                  className="text-green-600"
                />
              ) : (
                <Cross2Icon width="14" height="14" className="text-gray-500" />
              )}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
