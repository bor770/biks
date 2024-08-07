import { createReducer, on } from '@ngrx/store';

import * as AnalysisActions from './analysis.actions';
import { split } from '../../shared/util/functions';

export interface State {
  ids: number[];
  subjects: string[];
}

const initialState: State = { ids: [], subjects: [] };

export const reducer = createReducer(
  initialState,
  on(
    AnalysisActions.setIds,
    (state, action): State => ({
      ...state,
      ids: split(action.ids, (value) => +value) as number[],
    }),
  ),
  on(
    AnalysisActions.setSubjects,
    (state, action): State => ({
      ...state,
      subjects: split(action.subjects) as string[],
    }),
  ),
);
