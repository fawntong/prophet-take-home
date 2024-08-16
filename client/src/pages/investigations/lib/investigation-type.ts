export const InvestigationSeverity = {
  Low: "Low",
  Med: "Medium",
  High: "High",
  Crit: "Critical",
} as const;
export type InvestigationSeverity =
  (typeof InvestigationSeverity)[keyof typeof InvestigationSeverity];

export const InvestigationDetermination = {
  True: "True positive",
  False: "False positive",
  Pending: "In progress",
  Closed: "Closed",
} as const;
export type InvestigationDetermination =
  (typeof InvestigationDetermination)[keyof typeof InvestigationDetermination];

export const InvestigationSource = {
  AWS: "AWS",
  Azure: "Azure",
  Crowdstrike: "Crowdstrike",
  SentinelOne: "SentinelOne",
  Okta: "Okta",
} as const;
export type InvestigationSource =
  (typeof InvestigationSource)[keyof typeof InvestigationSource];

export interface Investigation {
  id: number;
  title: string;
  source: InvestigationSource;
  alertFiredTimestamp: Date;
  lastUpdatedTimestamp: Date;
  severity: InvestigationSeverity;
  analystAssigned: string;
  determination: InvestigationDetermination;
  readyForReview: boolean;
}
