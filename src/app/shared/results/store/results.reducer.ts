import { createReducer, on } from '@ngrx/store';

import { Result, Students } from '../results.model';
import { pick } from '../../util/pick';
import * as ResultsActions from './results.actions';

export interface State {
  results: (Result | undefined)[];
  students: Students;
}

const initialState: State = { results: [], students: {} };

export const reducer = createReducer(
  initialState,
  on(
    ResultsActions.add,
    (state): State => ({ ...state, results: state.results.concat(undefined) }),
  ),
  on(ResultsActions.remove, (state, action): State => {
    const newResults = state.results.toSpliced(action.index, 1);

    return {
      ...state,
      results: newResults,
      students: pick(
        state.students,
        newResults.map((result) => result?.studentId),
      ),
    };
  }),
  on(ResultsActions.save, (state, action): State => {
    const newResult = action.newResult;

    return {
      ...state,
      results: state.results.map((result, index) =>
        index === action.index ? newResult : result,
      ),
      students: {
        ...state.students,
        [newResult.studentId]: action.newStudentData,
      },
    };
  }),
);
