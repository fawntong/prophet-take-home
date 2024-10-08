import React, { useState } from "react";
import { InvestigationFilters } from "../lib/fetch-investigations";
import { Button, DropdownMenu, IconButton, TextField } from "@radix-ui/themes";
import { MixerHorizontalIcon, Cross1Icon } from "@radix-ui/react-icons";
import {
  InvestigationDetermination,
  InvestigationSeverity,
  InvestigationSource,
} from "../lib/investigation-type";

interface Props {
  activeFilters: InvestigationFilters;
  updateFilters: (newFilters: InvestigationFilters) => void;
  disabled?: boolean;
}

export const InvestigationFiltersBar: React.FC<Props> = ({
  activeFilters,
  updateFilters,
  disabled,
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
    <div className="flex gap-4 items-center">
      <AddFilterButton
        activeFilters={activeFilters}
        setPendingFilter={setPendingFilter}
        disabled={disabled}
      />
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
    </div>
  );
};

type Filter = keyof InvestigationFilters;

const FILTERABLE_COLUMNS: Record<
  Filter,
  { prettyName: string; options: string[] | null }
> = {
  determination: {
    prettyName: "Determination",
    options: Object.values(InvestigationDetermination),
  },
  id: {
    prettyName: "ID",
    options: null,
  },
  severity: {
    prettyName: "Severity",
    options: Object.values(InvestigationSeverity),
  },
  source: {
    prettyName: "Source",
    options: Object.values(InvestigationSource),
  },
};

const AddFilterButton: React.FC<{
  activeFilters: InvestigationFilters;
  setPendingFilter: (filterKey: Filter) => void;
  disabled?: boolean;
}> = ({ activeFilters, setPendingFilter, disabled }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger disabled={disabled}>
        <Button className="cursor-pointer">
          <MixerHorizontalIcon /> Filter <DropdownMenu.TriggerIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end">
        {Object.entries(FILTERABLE_COLUMNS).map(([key, { prettyName }]) => {
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
    <div className="inline-block rounded overflow-hidden">
      <DropdownMenu.Root defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        <DropdownMenu.Trigger>
          <Button size="1" radius="none" variant="soft">
            {FILTERABLE_COLUMNS[filter]?.prettyName}
            {filterValue && `: ${filterValue}`}
          </Button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          {options &&
            options.map((value) => (
              <DropdownMenu.CheckboxItem
                key={value}
                checked={filterValue === value}
                onClick={() => setFilter(filter, value)}
              >
                {value}
              </DropdownMenu.CheckboxItem>
            ))}
          {!options && (
            <TextField.Root
              size="1"
              placeholder="Search…"
              onBlur={(e) => {
                const value = e.target.value;
                if (value) {
                  setFilter(filter, e.target.value);
                }
              }}
              autoFocus={true}
            />
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <IconButton
        size="1"
        radius="none"
        variant="soft"
        onClick={() => removeFilter(filter)}
        className="border border-l"
      >
        <Cross1Icon width="10" height="10" />
      </IconButton>
    </div>
  );
};
