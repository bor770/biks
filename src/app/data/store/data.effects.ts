import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Result } from '../../shared/results/results.model';
import { pick } from '../../shared/util/functions';
import * as DataActions from './data.actions';
import * as ResultsActions from '../../shared/results/store/results.actions';

@Injectable()
export class DataEffects {
  actions$ = inject(Actions);

  addDeployedResult = createEffect(() => {
    // Transform the DataActions.saveDeployedResult action, which accepts a result in the deployed format to a ResultsActions.save action
    return this.actions$.pipe(
      ofType(DataActions.saveDeployedResult),
      map((action) => {
        const fullNewResult = action.result;

        return ResultsActions.save({
          index: fullNewResult.index,
          newResult: pick(fullNewResult, [
            `date`,
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
