import { createReducer, on } from '@ngrx/store';

import { ExamResult, StudentData, Students } from '../results.model';
import * as ResultsActions from './results.actions';

export interface State {
  examResults: (ExamResult | undefined)[];
  students: Students;
}

const initialState: State = { examResults: [], students: [] };

const pick = (object: object, keys: unknown[]) =>
  Object.fromEntries(
    Object.entries(object).filter(([key]) => keys.includes(key))
  );

export const reducer = createReducer(
  initialState,
  on(
    ResultsActions.add,
    (state): State => ({
      ...state,
      examResults: state.examResults.concat(undefined),
    })
  ),
  on(ResultsActions.remove, (state, action): State => {
    const newExamResults = state.examResults.toSpliced(action.index, 1);

    return {
      ...state,
      examResults: newExamResults,
      students: pick(
        state.students,
        newExamResults.map((examResult) => examResult?.studentId)
      ),
    };
  }),
  on(ResultsActions.save, (state, action): State => {
    const newResult = pick(action.newResult, [
      `grade`,
      `studentId`,
      `subject`,
    ]) as ExamResult;

    return {
      ...state,
      examResults: state.examResults.concat(newResult),
      students: {
        ...state.students,
        [newResult.studentId]: pick(action.newResult, [
          `address`,
          `city`,
          `country`,
          `dateJoined`,
          `email`,
          `name`,
          `zip`,
        ]) as StudentData,
      },
    };
  })
);
