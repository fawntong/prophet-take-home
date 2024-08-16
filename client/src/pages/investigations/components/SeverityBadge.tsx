import React from "react";
import { Badge, BadgeProps } from "@radix-ui/themes";
import { checkExhaustive } from "../../../lib/ts-utils";
import { InvestigationSeverity } from "../lib/investigation-type";

interface Props {
  severity: InvestigationSeverity;
}

export const SeverityBadge: React.FC<Props> = ({ severity }) => {
  return (
    <Badge
      color={getSeverityBadgeColor(severity)}
      variant="soft"
      size="2"
      radius="full"
    >
      <div
        className="w-[5px] h-[5px] rounded-full"
        style={{ background: "var(--accent-8)" }}
      />
      {severity}
    </Badge>
  );
};

const getSeverityBadgeColor = (
  severity: InvestigationSeverity,
): BadgeProps["color"] => {
  switch (severity) {
    case InvestigationSeverity.Low:
      return "lime";
    case InvestigationSeverity.Med:
      return "yellow";
    case InvestigationSeverity.High:
      return "orange";
    case InvestigationSeverity.Crit:
      return "tomato";
    default:
      return checkExhaustive(severity);
  }
};
