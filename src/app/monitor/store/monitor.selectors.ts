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
        // Filtering the full results. The first two filters (ids and names) are: only display a result, if BOTH it's id and name are in the filters. The last two filters (passed and failed) are: only display passed results is Passed is checked, and similarly for failed.
        (row) =>
          (filterIds.length ? filterIds.includes(row.id) : true) &&
          (filterNames.length ? filterNames.includes(row.name) : true) &&
          (state.passed || row.failed) &&
          (state.failed || !row.failed),
      );
  },
);
