import {
  Investigation,
  InvestigationDetermination,
  InvestigationSeverity,
} from "./fetch-investigations";
import { useMemo } from "react";
import {
  compareByPredefinedOrder,
  compareTypes,
  SortDirection,
} from "../../../lib/sort-utils";

export interface InvestigationSortDirection {
  field: keyof Investigation;
  direction: SortDirection;
}

const SEVERITY_ORDER = [
  InvestigationSeverity.LOW,
  InvestigationSeverity.MED,
  InvestigationSeverity.HIGH,
  InvestigationSeverity.CRIT,
];
const DETERMINATION_ORDER = [
  InvestigationDetermination.TRUE,
  InvestigationDetermination.FALSE,
  InvestigationDetermination.PENDING,
  InvestigationDetermination.CLOSED,
];

export const useSortInvestigations = (
  investigations: Investigation[],
  sortDirection: InvestigationSortDirection,
): Investigation[] => {
  const sortedInvestigations = useMemo(() => {
    // NOTE: Make a copy of the array since .sort sorts in place.
    // .toSorted can be used instead if node is upgraded to v20+
    return [...investigations].sort((invA, invB) => {
      const fieldA = invA[sortDirection.field];
      const fieldB = invB[sortDirection.field];

      if (sortDirection.field === "severity") {
        return compareByPredefinedOrder(
          fieldA,
          fieldB,
          sortDirection.direction,
          SEVERITY_ORDER,
        );
      }
      if (sortDirection.field === "determination") {
        return compareByPredefinedOrder(
          fieldA,
          fieldB,
          sortDirection.direction,
          DETERMINATION_ORDER,
        );
      }

      return compareTypes(fieldA, fieldB, sortDirection.direction);
    });
  }, [investigations, sortDirection]);

  return sortedInvestigations;
};

// TODO: figure out why none is not changing, sort by enums
