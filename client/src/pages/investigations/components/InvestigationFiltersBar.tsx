import React, { useState } from "react";
import {
  InvestigationDetermination,
  InvestigationFilters,
  InvestigationSeverity,
  InvestigationSource,
} from "../lib/fetch-investigations";
import { Badge, Button, DropdownMenu, IconButton } from "@radix-ui/themes";
import { MixerHorizontalIcon, Cross1Icon } from "@radix-ui/react-icons";

interface Props {
  activeFilters: InvestigationFilters;
  updateFilters: (newFilters: InvestigationFilters) => void;
}

export const InvestigationFiltersBar: React.FC<Props> = ({
  activeFilters,
  updateFilters,
}) => {
  const [pendingFilter, setPendingFilter] = useState<Filter | null>(null);

  const setFilter = (filter: Filter, value: string) => {
    if (pendingFilter === filter) {
      setPendingFilter(null);
    }

    updateFilters({
      ...activeFilters,
      [filter]: value,
    });
  };

  const removeFilter = (filter: Filter) => {
    if (pendingFilter === filter) {
      setPendingFilter(null);
    }

    updateFilters({
      ...activeFilters,
      [filter]: undefined,
    });
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2">
        {Object.entries(activeFilters).map(([filter, value]) =>
          value ? (
            <FilterBadge
              key={filter}
              filter={filter as Filter}
              filterValue={value}
              setFilter={setFilter}
              removeFilter={removeFilter}
            />
          ) : (
            <></>
          ),
        )}
        {pendingFilter && (
          <FilterBadge
            defaultOpen={true}
            // Cancel the pending filter if it's been unfocused
            onOpenChange={() => setPendingFilter(null)}
            filter={pendingFilter}
            setFilter={setFilter}
            removeFilter={removeFilter}
          />
        )}
      </div>
      <AddFilterButton
        activeFilters={activeFilters}
        setPendingFilter={setPendingFilter}
      />
    </div>
  );
};

type Filter = keyof InvestigationFilters;

// TODO: move this somewhere better?
// TODO: include times?
const FILTERABLE_COLUMNS: Record<
  Filter,
  { prettyName: string; options: [string, string][] | null }
> = {
  determination: {
    prettyName: "Determination",
    options: Object.entries(InvestigationDetermination),
  },
  id: {
    prettyName: "ID",
    options: null,
  },
  severity: {
    prettyName: "Severity",
    options: Object.entries(InvestigationSeverity),
  },
  source: {
    prettyName: "Source",
    options: Object.entries(InvestigationSource),
  },
};
const AddFilterButton: React.FC<{
  activeFilters: InvestigationFilters;
  setPendingFilter: (filterKey: Filter) => void;
}> = ({ activeFilters, setPendingFilter }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        {/* TODO: fix cursor */}
        <Button>
          <MixerHorizontalIcon /> Filter <DropdownMenu.TriggerIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end">
        {Object.entries(FILTERABLE_COLUMNS).map(([key, { prettyName }]) => {
          // TODO: message about why disabled?
          // TODO: better way to type?
          const active = activeFilters[key as Filter] !== undefined;
          return (
            <DropdownMenu.Item
              key={key}
              disabled={active}
              onSelect={() => setPendingFilter(key as Filter)}
            >
              {prettyName}
            </DropdownMenu.Item>
          );
        })}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

const FilterBadge: React.FC<{
  filter: Filter;
  filterValue?: string;
  setFilter: (filter: Filter, value: string) => void;
  removeFilter: (filter: Filter) => void;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}> = ({
  filter,
  filterValue,
  setFilter,
  removeFilter,
  defaultOpen,
  onOpenChange,
}) => {
  const options = FILTERABLE_COLUMNS[filter]?.options;

  return (
    <div className="inline-flex rounded overflow-hidden">
      <DropdownMenu.Root defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        <DropdownMenu.Trigger>
          {/* TODO: hover color, border to separate with button, cursor, fix casing on filter name*/}
          <Badge size="2" radius="none">
            {filter}
            {filterValue && `: ${filterValue}`}
          </Badge>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          {options && (
            <>
              {/* TODO: value is maybe not needed? it's just the enum */}
              {options.map(([value, label]) => (
                <DropdownMenu.CheckboxItem
                  key={value}
                  checked={filterValue === label}
                  onClick={() => setFilter(filter, label)}
                >
                  {label}
                </DropdownMenu.CheckboxItem>
              ))}
            </>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <IconButton
        size="1"
        radius="none"
        variant="soft"
        onClick={() => {
          console.log("clicked close");
          removeFilter(filter);
        }}
      >
        <Cross1Icon width="10" height="10" />
      </IconButton>
    </div>
  );
};
