import { createFeatureSelector, createSelector } from '@ngrx/store';

import { pick } from '../../shared/util/pick';
import * as ResultsSelectors from '../../shared/results/store/results.selectors';
import * as fromAnalysis from './analysis.reducer';

export const selectState =
  createFeatureSelector<fromAnalysis.State>(`analysis`);

export const selectsIds = createSelector(
  selectState,
  ResultsSelectors.selectIds,
  (state, allIds) => {
    const ids = state.ids;

    return (ids.length ? ids : allIds).toSorted();
  },
);

export const selectAveragesById = createSelector(
  ResultsSelectors.selectAveragesById,
  selectsIds,
  (averages, ids): number[] =>
    Object.entries(pick(averages, ids))
      .toSorted((a, b) => +a[0] - +b[0])
      .map((av) => av[1]),
);

export const selectSubjects = createSelector(
  selectState,
  ResultsSelectors.selectSubjects,
  (state, allSubjects) => {
    const subjects = state.subjects;

    return (subjects.length ? subjects : allSubjects).toSorted();
  },
);

export const selectAveragesBySubject = createSelector(
  ResultsSelectors.selectAveragesBySubject,
  selectSubjects,
  (averages, subjects): number[] =>
    Object.entries(pick(averages, subjects))
      .toSorted((a, b) => (a[0] < b[0] ? -1 : 1))
      .map((av) => av[1]),
);
