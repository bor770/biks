import { createAction, props } from '@ngrx/store';

import { FullDeployedExamResult } from '../../../data/data.model';

export const add = createAction(`[Results] Add`);

export const remove = createAction(
  `[Results] Remove`,
  props<{ index: number }>()
);

export const save = createAction(
  `[Results] Save`,
  props<{ index: number; newResult: FullDeployedExamResult }>()
);
