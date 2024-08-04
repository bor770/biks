import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PAGE_SIZE } from '../data.model';
import * as ResultsSelectors from '../../shared/results/store/results.selectors';
import * as fromData from './data.reducer';

const parseFilter = (filterString: string) => {
  const keys = [
    `address`,
    `city`,
    `country`,
    `date`,
    `email`,
    `grade`,
    `id`,
    `name`,
    `subject`,
    `zip`,
  ];

  const filterParts = filterString
    .split(`:`)
    .map((part) => part.toLowerCase().trim());

  const key = filterParts[0];

  return keys.includes(key) ? [key, filterParts.slice(1).join(`:`)] : null;
};

export const selectState = createFeatureSelector<fromData.State>(`data`);

export const selectFilterString = createSelector(
  selectState,
  (state) => state.filterString,
);

export const selectFilteredResults = createSelector(
  selectFilterString,
  ResultsSelectors.selectDeployedResults,
  (filterString, results) => {
    if (!filterString) {
      return results;
    } else {
      const parsedFilter = parseFilter(filterString);

      if (parsedFilter) {
        const key = parsedFilter[0];

        return results.filter(
          (result) => result![key as keyof typeof result] === parsedFilter[1],
        );
      } else {
        return [];
      }
    }
  },
);

export const selectIsRowSelected = createSelector(
  selectState,
  (state) => state.selectedRow >= 0,
);

export const selectPageIndex = createSelector(
  selectState,
  (state) => state.pageIndex,
);

export const selectPaginatedResults = createSelector(
  selectState,
  ResultsSelectors.selectAmountOfResults,
  ResultsSelectors.selectDeployedResults,
  (state, amountOfResults, deployedResults) => {
    const start = state.pageIndex * PAGE_SIZE;
    const end = Math.min(start + PAGE_SIZE, amountOfResults);

    return deployedResults.slice(start, end);
  },
);

export const selectSelectedRow = createSelector(
  selectState,
  (state) => state.selectedRow,
);
