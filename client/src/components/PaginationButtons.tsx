import React from "react";
import { IconButton, Text } from "@radix-ui/themes";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

interface Props {
  /** 1 indexed */
  currentPage: number;
  pageSize: number;
  maxPages?: number;
  /** Should make sense in the phrase "Showing __ x to x" */
  entityName?: string;
  incrementPage: () => void;
  decrementPage: () => void;
}

export const PaginationButtons: React.FC<Props> = ({
  currentPage,
  pageSize,
  maxPages,
  entityName,
  incrementPage,
  decrementPage,
}) => {
  const start = (currentPage - 1) * pageSize + 1;
  // TODO: need to take into account last page
  const end = currentPage * pageSize;
  return (
    <div className="w-full flex gap-4 justify-between">
      <Text size="2">
        Showing {entityName} <span className="font-semibold">{start}</span> to{" "}
        <span className="font-semibold">{end}</span>
      </Text>
      <div className="flex gap-2">
        <IconButton disabled={currentPage === 1} onClick={decrementPage}>
          <ArrowLeftIcon />
        </IconButton>
        <IconButton
          disabled={maxPages ? currentPage === maxPages - 1 : false}
          onClick={incrementPage}
        >
          <ArrowRightIcon />
        </IconButton>
      </div>
    </div>
  );
};
