import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  AmountOfResultsById,
  AveragesById,
  AveragesBySubject,
  Result,
  Students,
} from '../results.model';
import { DeployedResult } from '../../../data/data.model';
import * as fromResults from './results.reducer';

export const selectState = createFeatureSelector<fromResults.State>(`results`);

export const selectAmountOfResults = createSelector(
  selectState,
  (state) => state.results.length,
);

export const selectExistingResults = createSelector(
  selectState,
  (state): Result[] =>
    state.results.filter((result) => result?.studentId) as Result[],
);

export const selectAmountOfResultsById = createSelector(
  selectExistingResults,
  (results): AmountOfResultsById =>
    Object.fromEntries(
      [...new Set(results.map((result) => result.studentId))].map((id) => [
        id,
        results.filter((result) => result.studentId === id).length,
      ]),
    ),
);

export const selectAveragesById = createSelector(
  selectExistingResults,
  (results): AveragesById =>
    Object.fromEntries(
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
    ),
);

export const selectAveragesBySubject = createSelector(
  selectExistingResults,
  (results): AveragesBySubject =>
    Object.fromEntries(
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
    ),
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

export const selectIds = createSelector(
  selectExistingResults,
  (results): number[] => [
    ...new Set(results.map((result) => result?.studentId)),
  ],
);

export const selectStudentsData = createSelector(
  selectState,
  (state): Students => state.students,
);

export const selectSubjects = createSelector(
  selectExistingResults,
  (results): string[] => [...new Set(results.map((result) => result.subject))],
);
