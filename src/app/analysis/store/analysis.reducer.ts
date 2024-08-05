import { createReducer, on } from '@ngrx/store';

import * as AnalysisActions from './analysis.actions';

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
      ids: action.ids.split(`,`).map((id) => +id.trim()),
    }),
  ),
  on(
    AnalysisActions.setSubjects,
    (state, action): State => ({
      ...state,
      subjects: action.subjects.split(`,`).map((subject) => subject.trim()),
    }),
  ),
);
