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

const transformKey = (key: string) => {
  switch (key) {
    case `id`:
      return `studentId`;
    default:
      return key;
  }
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
        const value = parsedFilter[1];
        const realValue = value.slice(1);

        return results.filter((result) => {
          if (key !== `date`) {
            if (
              key !== `grade` ||
              (!value.startsWith(`<`) && !value.startsWith(`>`))
            ) {
              return (
                result?.[transformKey(key) as keyof typeof result]
                  ?.toString()
                  .toLowerCase() === value.toLowerCase()
              );
            } else {
              const grade = result?.grade;

              if (value.startsWith(`<`)) {
                return grade && grade < +realValue;
              }

              if (value.startsWith(`>`)) {
                return grade && grade > +realValue;
              }

              return;
            }
          } else {
            const date = result.date;
            const realDate = new Date(realValue);

            if (value.startsWith(`<`)) {
              return date && date < realDate;
            }

            if (value.startsWith(`>`)) {
              return date && date > realDate;
            }

            const dateToCompare = new Date(value);

            date?.setHours(0);
            dateToCompare.setHours(0);

            return date?.getTime() === dateToCompare.getTime();
          }
        });
      } else {
        return [];
      }
    }
  },
);

export const selectAmountOfFilteredResults = createSelector(
  selectFilteredResults,
  (results) => results.length,
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
  selectAmountOfFilteredResults,
  selectFilteredResults,
  (state, amountOfResults, filteredResults) => {
    const start = state.pageIndex * PAGE_SIZE;
    const end = Math.min(start + PAGE_SIZE, amountOfResults);

    return filteredResults.slice(start, end);
  },
);

export const selectSelectedRow = createSelector(
  selectState,
  (state) => state.selectedRow,
);
