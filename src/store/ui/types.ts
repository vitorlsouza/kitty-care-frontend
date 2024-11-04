export interface UIState {
  loading: boolean;
  // ... other UI state
}

export const SET_LOADING = 'SET_LOADING';

interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}

export type UIActionTypes = SetLoadingAction; 