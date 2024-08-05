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
    {
      date: new Date(`2024-01-01`),
      grade: 11,
      studentId: 1,
      subject: `Mathematical logic and foundations`,
    },
    {
      date: new Date(`2024-02-02`),
      grade: 22,
      studentId: 1,
      subject: `Combinatorics`,
    },
    {
      date: new Date(`2024-03-03`),
      grade: 33,
      studentId: 1,
      subject: `Order, lattices, ordered algebraic structures`,
    },
    {
      date: new Date(`2024-04-04`),
      grade: 44,
      studentId: 2,
      subject: `General algebraic systems`,
    },
    {
      date: new Date(`2024-05-05`),
      grade: 55,
      studentId: 2,
      subject: `Number theory`,
    },
    {
      date: new Date(`2024-06-06`),
      grade: 66,
      studentId: 2,
      subject: `Field theory and polynomials`,
    },
    {
      date: new Date(`2024-07-07`),
      grade: 77,
      studentId: 3,
      subject: `Commutative algebra`,
    },
    {
      date: new Date(`2024-08-08`),
      grade: 88,
      studentId: 3,
      subject: `Algebraic geometry`,
    },
    {
      date: new Date(`2024-09-09`),
      grade: 99,
      studentId: 3,
      subject: `Linear and multilinear algebra; matrix theory`,
    },
    {
      date: new Date(`2024-10-10`),
      grade: 100,
      studentId: 4,
      subject: `Associative rings and algebras`,
    },
    {
      date: new Date(`2024-11-11`),
      grade: 0,
      studentId: 4,
      subject: `Nonassociative rings and algebras`,
    },
    {
      date: new Date(`2024-12-12`),
      grade: 10,
      studentId: 4,
      subject: `Category theory; homological algebra`,
    },
  ],
  students: {
    1: { name: `Reuven` },
    2: { name: `Shimon ` },
    3: { name: `Levi` },
    4: { name: `Yehuda` },
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
