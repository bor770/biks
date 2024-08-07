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

const getDataByResultsProperty = (
  // Creates a record of certain result data by a specified key
  // The trick is to first get an array of distinct values for the specified key, and then to map if with mapFunction
  results: Result[],
  key: keyof Result,
  mapFunction: (arg: Result[typeof key]) => unknown,
) =>
  Object.fromEntries(
    [...new Set(results.map((result) => result[key]))].map((key) => [
      key,
      mapFunction(key),
    ]),
  );

const getRelevantResultsByProperty = (
  results: Result[],
  key: keyof Result,
  value: Result[typeof key],
) => results.filter((result) => result[key] === value);

export const selectState = createFeatureSelector<fromResults.State>(`results`);

export const selectAmountOfResults = createSelector(
  selectState,
  (state) => state.results.length,
);

export const selectNonEmptyResults = createSelector(
  // Selecting only non-empty rows
  selectState,
  (state): Result[] =>
    state.results.filter((result) => result?.studentId) as Result[],
);

export const selectAmountOfResultsById = createSelector(
  selectNonEmptyResults,
  (results): AmountOfResultsById =>
    getDataByResultsProperty(
      results,
      `studentId`,
      (id) => getRelevantResultsByProperty(results, `studentId`, id).length,
    ),
);

export const selectAveragesById = createSelector(
  selectNonEmptyResults,
  (results): AveragesById =>
    getDataByResultsProperty(results, `studentId`, (id) => {
      const relevantResults = getRelevantResultsByProperty(
        results,
        `studentId`,
        id,
      );

      return (
        relevantResults.map((result) => result.grade).reduce((a, b) => a + b) /
        relevantResults.length
      );
    }),
);

export const selectAveragesBySubject = createSelector(
  selectNonEmptyResults,
  (results): AveragesBySubject =>
    getDataByResultsProperty(results, `subject`, (subject) => {
      const relevantResults = getRelevantResultsByProperty(
        results,
        `subject`,
        subject,
      );

      return (
        relevantResults.map((result) => result.grade).reduce((a, b) => a + b) /
        relevantResults.length
      );
    }),
);

// The format used for the Data Component, with the Student Data "deployed" inside. Even in the case of an empty result, we keep the index
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
  // Distinct students ids
  selectNonEmptyResults,
  (results): number[] => [
    ...new Set(results.map((result) => result?.studentId)),
  ],
);

export const selectStudentsData = createSelector(
  selectState,
  (state): Students => state.students,
);

export const selectSubjects = createSelector(
  // Distinct subjects
  selectNonEmptyResults,
  (results): string[] => [...new Set(results.map((result) => result.subject))],
);
