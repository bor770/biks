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

  resetPageIndexOnAdd = createEffect(() => {
    return this.actions$.pipe(
      ofType(ResultsActions.add),
      map(() => DataActions.pageEvent({ pageIndex: 0 })),
    );
  });

  resetSelectedRowOnAdd = createEffect(() => {
    return this.actions$.pipe(
      ofType(ResultsActions.add),
      map(() => DataActions.selectRow({ index: 0, rowNumber: 0 })),
    );
  });

  resetSelectedRowOnRemove = createEffect(() => {
    // If no results left, index and rowNumber are reset
    return this.actions$.pipe(
      ofType(ResultsActions.remove),
      concatLatestFrom(() =>
        this.store.select(ResultsSelectors.selectAmountOfResults),
      ),
      filter(([, amountOfResults]) => !amountOfResults),
      map(() => DataActions.selectRow({ index: -1, rowNumber: -1 })),
    );
  });
}
