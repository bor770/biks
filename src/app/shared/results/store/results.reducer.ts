import { createReducer, on } from '@ngrx/store';

import { Result, Students } from '../results.model';
import { pick } from '../../util/pick';
import * as ResultsActions from './results.actions';

export interface State {
  results: (Result | undefined)[];
  students: Students;
}

const initialState: State = {
  results: [
    { grade: 11, studentId: 1, subject: `Mathematical logic and foundations` },
    { grade: 22, studentId: 1, subject: `Combinatorics` },
    {
      grade: 33,
      studentId: 1,
      subject: `Order, lattices, ordered algebraic structures`,
    },
    { grade: 44, studentId: 2, subject: `General algebraic systems` },
    { grade: 55, studentId: 2, subject: `Number theory` },
    { grade: 66, studentId: 2, subject: `Field theory and polynomials` },
    { grade: 77, studentId: 3, subject: `Commutative algebra` },
    { grade: 88, studentId: 3, subject: `Algebraic geometry` },
    {
      grade: 99,
      studentId: 3,
      subject: `Linear and multilinear algebra; matrix theory`,
    },
    { grade: 100, studentId: 4, subject: `Associative rings and algebras` },
    { grade: 0, studentId: 4, subject: `Nonassociative rings and algebras` },
    {
      grade: 10,
      studentId: 4,
      subject: `Category theory; homological algebra`,
    },
  ],
  students: {
    1: { dateJoined: new Date(`2024-01-01`), name: `Reuven` },
    2: { dateJoined: new Date(`2024-02-02`), name: `Shimon ` },
    3: { dateJoined: new Date(`2024-03-03`), name: `Levi` },
    4: { dateJoined: new Date(`2024-04-04`), name: `Yehuda` },
  },
};

export const reducer = createReducer(
  initialState,
  on(
    ResultsActions.add,
    (state): State => ({
      ...state,
      results: ([undefined] as State['results']).concat(state.results),
    }),
  ),
  on(ResultsActions.remove, (state, action): State => {
    const newResults = state.results.toSpliced(action.index, 1);

    return {
      ...state,
      results: newResults,
      students: pick(
        state.students,
        newResults.map((result) => String(result?.studentId)),
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
