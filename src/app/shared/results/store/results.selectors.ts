import { createFeatureSelector, createSelector } from '@ngrx/store';

import { DeployedExamResult } from '../../../data/data.model';
import * as fromResults from './results.reducer';

export const selectState = createFeatureSelector<fromResults.State>(`results`);

export const selectDeployedExamResults = createSelector(selectState, (state) =>
  state.examResults.map(
    (result): DeployedExamResult =>
      result ? { ...result, ...state.students[result.studentId] } : undefined
  )
);
