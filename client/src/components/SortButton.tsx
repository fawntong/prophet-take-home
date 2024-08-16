import React from "react";
import { IconButton, Tooltip } from "@radix-ui/themes";
import { getNextSortDirection, SortDirection } from "../lib/sort-utils";
import { ArrowDownIcon, ArrowUpIcon, DashIcon } from "@radix-ui/react-icons";

interface Props {
  sortDirection: SortDirection;
  updateSortDirection: (newDirection: SortDirection) => void;
  disabled?: boolean;
}

export const SortButton: React.FC<Props> = ({
  sortDirection,
  updateSortDirection,
  disabled,
}) => {
  const tooltipText =
    sortDirection === "asc"
      ? "Ascending"
      : sortDirection === "desc"
        ? "Descending"
        : "Click to sort";

  return (
    <Tooltip content={tooltipText}>
      <IconButton
        size="1"
        variant={sortDirection === "none" ? "ghost" : "soft"}
        className={sortDirection === "none" ? "!m-0" : ""}
        onClick={() => updateSortDirection(getNextSortDirection(sortDirection))}
        disabled={disabled}
      >
        {sortDirection === "asc" ? (
          <ArrowUpIcon width="15" height="15" />
        ) : sortDirection === "desc" ? (
          <ArrowDownIcon width="15" height="15" />
        ) : (
          <DashIcon width="16" height="16" />
        )}
      </IconButton>
    </Tooltip>
  );
};
