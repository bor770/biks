import { ActionReducerMap } from '@ngrx/store';

import * as fromAnalysis from '../analysis/store/analysis.reducer';
import * as fromData from '../data/store/data.reducer';
import * as fromMonitor from '../monitor/store/monitor.reducer';
import * as fromResults from '../shared/results/store/results.reducer';

export interface RootState {
  analysis: fromAnalysis.State;
  data: fromData.State;
  monitor: fromMonitor.State;
  results: fromResults.State;
}

export const rootReducer: ActionReducerMap<RootState> = {
  analysis: fromAnalysis.reducer,
  data: fromData.reducer,
  monitor: fromMonitor.reducer,
  results: fromResults.reducer,
};
