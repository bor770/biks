import { createReducer, on } from '@ngrx/store';

import * as MonitorActions from './monitor.actions';

export interface State {
  failed: boolean;
  ids: number[];
  names: string[];
  passed: boolean;
}

const initialState: State = { failed: true, ids: [], names: [], passed: true };

export const reducer = createReducer(
  initialState,
  on(
    MonitorActions.setFailed,
    (state, action): State => ({ ...state, failed: action.failed }),
  ),
  on(MonitorActions.setIds, (state, action): State => {
    const ids = action.ids;

    return {
      ...state,
      ids: ids.length ? ids.split(`,`).map((id) => +id.trim()) : [],
    };
  }),
  on(MonitorActions.setNames, (state, action): State => {
    const names = action.names;

    return {
      ...state,
      names: names.length ? names.split(`,`).map((name) => name.trim()) : [],
    };
  }),
  on(
    MonitorActions.setPassed,
    (state, action): State => ({ ...state, passed: action.passed }),
  ),
);
