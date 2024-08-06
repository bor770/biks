import { createReducer, on } from '@ngrx/store';

import * as DataActions from './data.actions';

export interface State {
  filterString: string;
  pageIndex: number;
  selectedRow: number;
  selectedRowIndex: number;
}

const initalState: State = {
  filterString: ``,
  pageIndex: 0,
  selectedRow: -1,
  selectedRowIndex: -1,
};

export const reducer = createReducer(
  initalState,
  on(
    DataActions.filter,
    (state, action): State => ({
      ...state,
      filterString: action.filterString,
      pageIndex: 0,
      selectedRow: -1,
      selectedRowIndex: -1,
    }),
  ),
  on(
    DataActions.pageEvent,
    (state, action): State => ({
      ...state,
      pageIndex: action.pageIndex,
      selectedRow: -1,
      selectedRowIndex: -1,
    }),
  ),
  on(
    DataActions.selectRow,
    (state, action): State => ({
      ...state,
      selectedRow: action.rowNumber,
      selectedRowIndex: action.index,
    }),
  ),
);
