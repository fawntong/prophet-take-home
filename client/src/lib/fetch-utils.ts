export interface FetchState {
  /** Whether the initial data fetch is loading. Will not be true when waiting for data while paginating. */
  loading: boolean;
  /** Whether a pagination fetch is loading */
  fetchingMore: boolean;
  error: string | null;
}

export const INITIAL_FETCH_STATE: FetchState = {
  loading: false,
  fetchingMore: false,
  error: null,
};
