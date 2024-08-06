import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AveragesById, AveragesBySubject, Result } from '../results.model';
import { DeployedResult } from '../../../data/data.model';
import * as fromResults from './results.reducer';

export const selectState = createFeatureSelector<fromResults.State>(`results`);

export const selectAmountOfResults = createSelector(
  selectState,
  (state) => state.results.length,
);

export const selectAveragesById = createSelector(
  selectState,
  (state): AveragesById => {
    const results = state.results.filter(
      (result) => result?.studentId,
    ) as Result[];

    return Object.fromEntries(
      [...new Set(results.map((result) => result.studentId))].map((id) => {
        const relevantResults = results.filter(
          (result) => result.studentId === id,
        );

        return [
          id,
          relevantResults
            .map((result) => result.grade)
            .reduce((a, b) => a + b) / relevantResults.length,
        ];
      }),
    );
  },
);

export const selectAveragesBySubject = createSelector(
  selectState,
  (state): AveragesBySubject => {
    const results = state.results.filter((result) => result?.grade) as Result[];

    return Object.fromEntries(
      [...new Set(results.map((result) => result.subject))].map((subject) => {
        const relevantResults = results.filter(
          (result) => result.subject === subject,
        );

        return [
          subject,
          relevantResults
            .map((result) => result.grade)
            .reduce((a, b) => a + b) / relevantResults.length,
        ];
      }),
    );
  },
);

export const selectDeployedResults = createSelector(selectState, (state) =>
  state.results.map(
    (result, index): DeployedResult => ({
      ...(result
        ? { ...result, ...state.students[result.studentId] }
        : undefined),
      index,
    }),
  ),
);

export const selectIds = createSelector(selectState, (state): number[] =>
  (state.results.filter((result) => result?.studentId) as Result[])
    .map((result) => result?.studentId)
    .sort(),
);
