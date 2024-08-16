import React from "react";
import { IconButton, Text } from "@radix-ui/themes";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { useImmer } from "use-immer";

interface Props {
  /** 1 indexed */
  currentPage: number;
  pageSize: number;
  /** The number of items currently being displayed on the page */
  numDisplayed: number;
  maxPages?: number;
  /** Should make sense in the phrase "Showing __ x to x" */
  entityName?: string;
  incrementPage: () => Promise<void>;
  decrementPage: () => Promise<void>;
}

export const PaginationButtons: React.FC<Props> = ({
  currentPage,
  pageSize,
  numDisplayed,
  maxPages,
  entityName,
  incrementPage,
  decrementPage,
}) => {
  const [loading, setLoading] = useImmer<{
    incrementing: boolean;
    decrementing: boolean;
  }>({ incrementing: false, decrementing: false });

  const start = (currentPage - 1) * pageSize + 1;
  const end = start + numDisplayed - 1;

  return (
    <div className="w-full flex gap-4 justify-between">
      <Text size="2">
        Showing {entityName} <span className="font-semibold">{start}</span> to{" "}
        <span className="font-semibold">{end}</span>
      </Text>
      <div className="flex gap-2">
        <IconButton
          loading={loading.decrementing}
          disabled={currentPage === 1}
          onClick={async () => {
            setLoading((draft) => {
              draft.decrementing = true;
            });
            await decrementPage();
            setLoading((draft) => {
              draft.decrementing = false;
            });
          }}
        >
          <ArrowLeftIcon />
        </IconButton>
        <IconButton
          loading={loading.incrementing}
          disabled={maxPages ? currentPage === maxPages - 1 : false}
          onClick={async () => {
            setLoading((draft) => {
              draft.incrementing = true;
            });
            await incrementPage();
            setLoading((draft) => {
              draft.incrementing = false;
            });
          }}
        >
          <ArrowRightIcon />
        </IconButton>
      </div>
    </div>
  );
};
