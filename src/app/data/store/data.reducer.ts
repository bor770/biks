import { createReducer, on } from '@ngrx/store';

import * as DataActions from './data.actions';

export interface State {
  filterString: string;
  pageIndex: number;
  selectedRow: number; // The number of the row selected on the page, -1 if none selected
  selectedRowIndex: number; // The index of the selected row in the results store, -1 if none selected
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
    DataActions.filter, // On new filtering, all fields are reset
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
