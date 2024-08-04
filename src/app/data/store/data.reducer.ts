import { createReducer, on } from '@ngrx/store';

import * as DataActions from './data.actions';

export interface State {
  filterString: string;
  pageIndex: number;
  selectedRow: number;
}

const initalState: State = { filterString: ``, pageIndex: 0, selectedRow: -1 };

export const reducer = createReducer(
  initalState,
  on(DataActions.filter, (state, action) => ({
    ...state,
    filter: action.filterString,
  })),
  on(DataActions.pageEvent, (state, action) => ({
    ...state,
    pageIndex: action.pageIndex,
    selectedRow: -1,
  })),
  on(DataActions.selectRow, (state, action) => ({
    ...state,
    selectedRow: action.index,
  })),
);
