import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PAGE_SIZE } from '../data.model';
import * as ResultsSelectors from '../../shared/results/store/results.selectors';
import * as fromData from './data.reducer';

const parseFilter = (filterString: string) => {
  // Parsing the filter string to create a filter object, such as: { id : 1 }. If format is invalid, null is returned
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

  const filterParts = filterString.split(`:`).map((part) => part.trim());

  const key = filterParts[0].toLowerCase();

  return keys.includes(key) ? [key, filterParts.slice(1).join(`:`)] : null;
};

const transformKey = (key: string) => (key === `id` ? `studentId` : key);

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
      // If filter is empty, don't filter
      return results;
    } else {
      const parsedFilter = parseFilter(filterString);

      if (parsedFilter) {
        // Filter is valid
        const key = parsedFilter[0];
        const value = parsedFilter[1];

        return results.filter((result) => {
          const realValue = value.slice(1); // To handle the case that value starts with < or >
          if (key !== `date`) {
            if (
              key !== `grade` ||
              (!value.startsWith(`<`) && !value.startsWith(`>`))
            ) {
              return (
                result[transformKey(key) as keyof typeof result]?.toString() ===
                value
              );
            } else {
              // key is `grade`, value starts with < or >
              const grade = result?.grade;

              if (value.startsWith(`<`)) {
                return grade && grade < +realValue;
              }

              if (value.startsWith(`>`)) {
                return grade && grade > +realValue;
              }

              return; // To avoid the warning "Not all code paths return a value"
            }
          } else {
            // key is `date`
            const date = result.date;
            const realDate = new Date(realValue);

            if (value.startsWith(`<`)) {
              return date && date < realDate;
            }

            if (value.startsWith(`>`)) {
              return date && date > realDate;
            }

            // value is an exact date
            const dateToCompare = new Date(value);

            // Comparing only dates, not hours
            date?.setHours(0);
            dateToCompare.setHours(0);

            return date?.getTime() === dateToCompare.getTime();
          }
        });
      } else {
        // If filter is invalid, return no results
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

// selectedRowIndex is the index of the selected row in the "real" Results state slice
export const selectSelectedRowIndex = createSelector(
  selectState,
  (state) => state.selectedRowIndex,
);

// Index of the row selected on screen
export const selectSelectedRowNumber = createSelector(
  selectState,
  (state) => state.selectedRow,
);
