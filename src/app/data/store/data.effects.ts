import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Result } from '../../shared/results/results.model';
import { pick } from '../../shared/util/pick';
import * as DataActions from './data.actions';
import * as ResultsActions from '../../shared/results/store/results.actions';

@Injectable()
export class DataEffects {
  actions$ = inject(Actions);
  addDeployedResult = createEffect(() => {
    return this.actions$.pipe(
      ofType(DataActions.saveDeployedResult),
      map((action) => {
        const fullNewResult = action.result;

        return ResultsActions.save({
          index: fullNewResult.index,
          newResult: pick(fullNewResult, [
            `grade`,
            `studentId`,
            `subject`,
          ]) as Result,
          newStudentData: pick(fullNewResult, [
            `address`,
            `city`,
            `country`,
            `dateJoined`,
            `email`,
            `name`,
            `zip`,
          ]),
        });
      }),
    );
  });
}
