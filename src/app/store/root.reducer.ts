import { ActionReducerMap } from '@ngrx/store';

import * as fromData from '../data/store/data.reducer';
import * as fromResults from '../shared/results/store/results.reducer';

export interface RootState {
  data: fromData.State;
  results: fromResults.State;
}

export const rootReducer: ActionReducerMap<RootState> = {
  data: fromData.reducer,
  results: fromResults.reducer,
};
