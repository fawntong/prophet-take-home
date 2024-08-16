export type SortDirection = "asc" | "desc" | "none";

const directionOrder: SortDirection[] = ["none", "asc", "desc"];
export const getNextSortDirection = (
  currentDirection: SortDirection,
): SortDirection => {
  const currIndex = directionOrder.indexOf(currentDirection);
  const nextIndex = (currIndex + 1) % directionOrder.length;
  return directionOrder[nextIndex];
};

const compareAlphabetical = (
  a: string,
  b: string,
  direction: SortDirection,
) => {
  switch (direction) {
    case "none":
      return 0;
    case "asc":
      return a.localeCompare(b);
    case "desc":
      return b.localeCompare(a);
  }
};

const compareNumbers = (a: number, b: number, direction: SortDirection) => {
  switch (direction) {
    case "none":
      return 0;
    case "asc":
      return a - b;
    case "desc":
      return b - a;
  }
};

const compareBooleans = (a: boolean, b: boolean, direction: SortDirection) => {
  switch (direction) {
    case "none":
      return 0;
    case "asc":
      return Number(b) - Number(a);
    case "desc":
      return Number(a) - Number(b);
  }
};

const compareDates = (a: Date, b: Date, direction: SortDirection) => {
  switch (direction) {
    case "none":
      return 0;
    case "asc":
      return a.getTime() - b.getTime();
    case "desc":
      return b.getTime() - a.getTime();
  }
};

type AcceptedCompareType = string | number | boolean | Date;

export const compareTypes = (
  a: AcceptedCompareType,
  b: AcceptedCompareType,
  direction: SortDirection,
) => {
  if (typeof a === "string" && typeof b === "string") {
    return compareAlphabetical(a, b, direction);
  }
  if (typeof a === "number" && typeof b === "number") {
    return compareNumbers(a, b, direction);
  }
  if (typeof a === "boolean" && typeof b === "boolean") {
    return compareBooleans(a, b, direction);
  }
  if (a instanceof Date && b instanceof Date) {
    return compareDates(a, b, direction);
  }
  throw new Error(
    "a and b must be of the same type and be either a string, number, boolean, or Date.",
  );
};

export const compareByPredefinedOrder = <T>(
  a: T,
  b: T,
  direction: SortDirection,
  predefinedOrder: T[],
  allowUnidentified: boolean = false,
): number => {
  let indexA = predefinedOrder.indexOf(a);
  let indexB = predefinedOrder.indexOf(b);
  if (allowUnidentified) {
    indexA = indexA === -1 ? predefinedOrder.length + 1 : indexA;
    indexB = indexB === -1 ? predefinedOrder.length + 1 : indexB;
  } else if (indexA === -1 || indexB === -1) {
    throw new Error(
      `Tried to compare elements that are not in the predefinedOrder: ${indexA === -1 ? String(a) : ""} ${indexB === -1 ? String(b) : ""}`,
    );
  }

  switch (direction) {
    case "none":
      return 0;
    case "asc":
      return indexA - indexB;
    case "desc":
      return indexB - indexA;
  }
};
