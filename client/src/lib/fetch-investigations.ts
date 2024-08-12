import axios from 'axios';
import {useEffect, useState} from "react";
import { useImmer } from "use-immer";
import {FetchState, INITIAL_FETCH_STATE} from "./fetch-utils";

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

// TODO: how to make this extensible?
export interface Investigation {
    id: number,
    title: string,
    source: string, //'AWS' | 'Azure' | 'Crowdstrike' | 'SentinelOne' | 'Okta',
    alertFiredTimestamp: Date,
    lastUpdatedTimestamp: Date,
    severity: InvestigationSeverity,
    analystAssigned: string,
    determination: InvestigationDetermination,
    readyForReview: boolean,
}

export const useFetchInvestigations = (): {
    investigations: Investigation[],
    loading: boolean,
} => {
    const [investigations, setInvestigations] = useState<Investigation[]>([]);
    const [fetchState, setFetchState] = useImmer<FetchState>(INITIAL_FETCH_STATE);
    console.log(fetchState);

    useEffect(() => {
        setFetchState(INITIAL_FETCH_STATE);
        // TODO: set up subscription? observable?
        try {
            axios.get("/investigations").then((data) => {
                // TODO: do something with status
                // TODO: check bad response case
                // TODO: check what happens if something goes wrong while parsing
                setInvestigations(parseData(data.data));
                setFetchState(draft => {
                    draft.loading = false;
                })
            }).catch(e => {
                setFetchState(draft => {
                    draft.error = e;
                })
            })
        } catch (e) {
            // TODO:
            // setFetchState(draft => {
            //     // TODO: convert to string
            //     draft.error = e;
            // })
            console.error("ERROR", e);
        }
    }, []);

    return {
        investigations,
        loading: false,
    }
}

const parseData = (data: any): Investigation[] => {
    if (!Array.isArray(data)) {
        throw new Error("Expected array");
    }

    // TODO: verify types and fields?
    return data.map(item => ({
        id: item.id,
        title: item.title,
        source: item.source,
        alertFiredTimestamp: new Date(item.alertFiredTimestamp), // TODO: verify these dates are correct
        lastUpdatedTimestamp: new Date(item.lastUpdatedTimestamp),
        severity: parseSeverity(item.severity),
        analystAssigned: item.analystAssigned,
        determination: parseDetermination(item.determination),
        readyForReview: item.readyForReview === "Yes", // TODO: check for no?
    }));
}

const parseSeverity = (sev: any): InvestigationSeverity => {
    if (typeof sev !== "string") {
        throw new Error("Expected severity to be a string but got " + typeof sev);
    }

    const parsedSev = Object.values(InvestigationSeverity).find(s => s === sev);

    if (!parsedSev) {
        throw new Error("Could not parse severity");
    }

    return parsedSev;
}

const parseDetermination = (det: any): InvestigationDetermination => {
    if (typeof det !== "string") {
        throw new Error("Expected determination to be a string but got " + typeof det);
    }

    const parsedDet = Object.values(InvestigationDetermination).find(d => d === det);

    if (!parsedDet) {
        throw new Error("Could not parse determination");
    }

    return parsedDet;
}