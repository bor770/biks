import { createFeatureSelector, createSelector } from '@ngrx/store';

import { MonitorData, PASSED_GRADE } from '../monitor.model';
import * as ResultsSelectors from '../../shared/results/store/results.selectors';
import * as fromMonitor from './monitor.reducer';

export const selectState = createFeatureSelector<fromMonitor.State>(`monitor`);

export const selectFilteredResults = createSelector(
  selectState,
  ResultsSelectors.selectIds,
  ResultsSelectors.selectAmountOfResultsById,
  ResultsSelectors.selectAveragesById,
  ResultsSelectors.selectStudentsData,
  (state, ids, amounts, averages, students): MonitorData[] => {
    const filterIds = state.ids;
    const filterNames = state.names;

    return ids
      .map((id) => ({
        average: averages[id],
        exams: amounts[id],
        failed: averages[id] <= PASSED_GRADE,
        id,
        name: students[id].name!,
      }))
      .filter(
        (row) =>
          (filterIds.length ? filterIds.includes(row.id) : true) &&
          (filterNames.length ? filterNames.includes(row.name) : true) &&
          (state.passed || row.failed) &&
          (state.failed || !row.failed),
      );
  },
);
