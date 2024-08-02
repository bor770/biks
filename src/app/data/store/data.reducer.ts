import { createReducer, on } from '@ngrx/store';

import * as DataActions from './data.actions';

export interface State {
  selectedRow: number;
}

const initalState: State = { selectedRow: -1 };

export const reducer = createReducer(
  initalState,
  on(DataActions.selectRow, (state, action) => ({
    ...state,
    selectedRow: action.index,
  })),
);
