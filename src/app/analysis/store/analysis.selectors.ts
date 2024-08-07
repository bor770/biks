import { createFeatureSelector, createSelector } from '@ngrx/store';

import { pick } from '../../shared/util/functions';
import * as ResultsSelectors from '../../shared/results/store/results.selectors';
import * as fromAnalysis from './analysis.reducer';

// Get an array of averages, sorted by the key
const getAveragesByKey = <T extends number | string>(
  averages: Record<T, number>,
  keys: T[],
  sortingFunction: (a: [string, T], b: [string, T]) => number,
) =>
  Object.entries(pick(averages, keys))
    .toSorted(sortingFunction)
    .map((av) => av[1]);

// Get values in filter, or all values if filter is empty
const getValues = <T>(values: T[], allValues: T[]): T[] =>
  (values.length ? values : allValues).toSorted();

export const selectState =
  createFeatureSelector<fromAnalysis.State>(`analysis`);

export const selectsIds = createSelector(
  selectState,
  ResultsSelectors.selectIds,
  (state, allIds) => getValues(state.ids, allIds),
);

export const selectAveragesById = createSelector(
  ResultsSelectors.selectAveragesById,
  selectsIds,
  (averages, ids) => getAveragesByKey(averages, ids, (a, b) => +a[0] - +b[0]),
);

export const selectSubjects = createSelector(
  selectState,
  ResultsSelectors.selectSubjects,
  (state, allSubjects) => getValues(state.subjects, allSubjects),
);

export const selectAveragesBySubject = createSelector(
  ResultsSelectors.selectAveragesBySubject,
  selectSubjects,
  (averages, subject) =>
    getAveragesByKey(averages, subject, (a, b) => (a[0] < b[0] ? -1 : 1)),
);
