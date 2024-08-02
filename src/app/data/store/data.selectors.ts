import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromData from './data.reducer';

export const selectState = createFeatureSelector<fromData.State>(`data`);

export const selectIsRowSelected = createSelector(
  selectState,
  (state) => state.selectedRow >= 0,
);

export const selectSelectedRow = createSelector(
  selectState,
  (state) => state.selectedRow,
);
