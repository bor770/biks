import { createReducer, on } from '@ngrx/store';

import { split } from '../../shared/util/functions';
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
  on(
    MonitorActions.setIds,
    (state, action): State => ({
      ...state,
      ids: split(action.ids, (value) => +value) as number[],
    }),
  ),
  on(
    MonitorActions.setNames,
    (state, action): State => ({
      ...state,
      names: split(action.names) as string[],
    }),
  ),
  on(
    MonitorActions.setPassed,
    (state, action): State => ({ ...state, passed: action.passed }),
  ),
);
