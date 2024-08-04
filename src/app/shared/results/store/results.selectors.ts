import { createFeatureSelector, createSelector } from '@ngrx/store';

import { DeployedResult } from '../../../data/data.model';
import * as fromResults from './results.reducer';

export const selectState = createFeatureSelector<fromResults.State>(`results`);

export const selectAmountOfResults = createSelector(
  selectState,
  (state) => state.results.length,
);

export const selectDeployedResults = createSelector(selectState, (state) =>
  state.results.map((result, index): DeployedResult => ({
    ...(result
      ? { ...result, ...state.students[result.studentId] }
      : undefined),
    index,
  })),
);
