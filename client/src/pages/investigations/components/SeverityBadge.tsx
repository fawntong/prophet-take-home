import React from "react";
import {InvestigationSeverity} from "../../../lib/fetch-investigations";
import {Badge, BadgeProps} from "@radix-ui/themes";
import {checkExhaustive} from "../../../lib/ts-utils";

interface Props {
    severity: InvestigationSeverity;
}

export const SeverityBadge: React.FC<Props> = ({severity}) => {
    return (
        <Badge color={getSeverityBadgeColor(severity)} variant="soft" size="2">{severity}</Badge>
    )
}

const getSeverityBadgeColor = (severity: InvestigationSeverity): BadgeProps["color"] => {
    switch (severity) {
        case InvestigationSeverity.LOW:
            return "lime";
        case InvestigationSeverity.MED:
            return "yellow";
        case InvestigationSeverity.HIGH:
            return "orange";
        case InvestigationSeverity.CRIT:
            return "tomato";
        default:
            return checkExhaustive(severity);
    }
}