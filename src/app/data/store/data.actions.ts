import { createAction, props } from '@ngrx/store';

export const selectRow = createAction(
  `[Data] Select Row`,
  props<{ index: number }>(),
);
