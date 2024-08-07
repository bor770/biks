import { createAction, props } from '@ngrx/store';

import { Result, StudentData } from '../results.model';

export const add = createAction(`[Results] Add`); // Add an empty result

export const remove = createAction(
  `[Results] Remove`,
  props<{ index: number }>(),
);

export const save = createAction(
  `[Results] Save`,
  props<{ index: number; newResult: Result; newStudentData: StudentData }>(),
);
