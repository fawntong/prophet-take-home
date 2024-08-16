export interface FetchState {
  /** Whether the initial data fetch is loading. Will not be true when waiting for data while paginating. */
  loading: boolean;
  /** Any error that occurred while fetching the initial data */
  loadingError: string | null;

  /** Whether a pagination fetch is loading */
  fetchingMore: boolean;
  /** Any error that occurred while paginating */
  fetchingMoreError: string | null;
}

export const INITIAL_FETCH_STATE: FetchState = {
  loading: true,
  loadingError: null,
  fetchingMore: false,
  fetchingMoreError: null,
};
