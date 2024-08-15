export enum InvestigationSeverity {
  LOW = "Low",
  MED = "Medium",
  HIGH = "High",
  CRIT = "Critical",
}

export enum InvestigationDetermination {
  TRUE = "True positive",
  FALSE = "False positive",
  PENDING = "In progress",
  CLOSED = "Closed",
}

export enum InvestigationSource {
  AWS = "AWS",
  AZURE = "Azure",
  CROWDSTRIKE = "Crowdstrike",
  SENTINEL_ONE = "SentinelOne",
  OKTA = "Okta",
}

// TODO: how to make this extensible?
export interface Investigation {
  id: number;
  title: string;
  source: InvestigationSource; //'AWS' | 'Azure' | 'Crowdstrike' | 'SentinelOne' | 'Okta',
  alertFiredTimestamp: Date;
  lastUpdatedTimestamp: Date;
  severity: InvestigationSeverity;
  analystAssigned: string;
  determination: InvestigationDetermination;
  readyForReview: boolean;
}
