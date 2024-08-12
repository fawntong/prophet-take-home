export interface FetchState {
    loading: boolean;
    error: string | null;
}

export const INITIAL_FETCH_STATE: FetchState =  {
    loading: false,
    error: null,
}