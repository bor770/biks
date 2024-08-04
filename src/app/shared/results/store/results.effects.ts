import { Injectable, inject } from '@angular/core';
import { filter, map } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';

import * as DataActions from '../../../data/store/data.actions';
import * as ResultsActions from './results.actions';
import * as ResultsSelectors from './results.selectors';

@Injectable()
export class ResultsEffects {
  actions$ = inject(Actions);
  store = inject(Store);
  setSelectedRowOnAdd = createEffect(() => {
    return this.actions$.pipe(
      ofType(ResultsActions.add),
      concatLatestFrom(() =>
        this.store.select(ResultsSelectors.selectAmountOfResults),
      ),
      map(([, amountOfResults]) =>
        DataActions.selectRow({ index: amountOfResults - 1 }),
      ),
    );
  });
  removeSelectedRowOnRemove = createEffect(() => {
    return this.actions$.pipe(
      ofType(ResultsActions.remove),
      concatLatestFrom(() =>
        this.store.select(ResultsSelectors.selectAmountOfResults),
      ),
      filter(([, amountOfResults]) => !amountOfResults),
      map(() => DataActions.selectRow({ index: -1 })),
    );
  });
}
