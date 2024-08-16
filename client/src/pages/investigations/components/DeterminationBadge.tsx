import React from "react";
import { Badge, BadgeProps } from "@radix-ui/themes";
import { checkExhaustive } from "../../../lib/ts-utils";
import { InvestigationDetermination } from "../lib/investigation-type";

interface Props {
  determination: InvestigationDetermination;
}

export const DeterminationBadge: React.FC<Props> = ({ determination }) => {
  return (
    <Badge
      color={getDeterminationBadgeColor(determination)}
      variant="soft"
      size="2"
    >
      {determination}
    </Badge>
  );
};

const getDeterminationBadgeColor = (
  determination: InvestigationDetermination,
): BadgeProps["color"] => {
  switch (determination) {
    case InvestigationDetermination.True:
      return "grass";
    case InvestigationDetermination.False:
      return "tomato";
    case InvestigationDetermination.Pending:
      return "amber";
    case InvestigationDetermination.Closed:
      return "gray";
    default:
      return checkExhaustive(determination);
  }
};
