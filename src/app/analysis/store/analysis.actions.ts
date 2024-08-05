import { createAction, props } from '@ngrx/store';

export const setIds = createAction(
  `[Analysis] Set Ids`,
  props<{ ids: string }>(),
);

export const setSubjects = createAction(
  `[Analysis] Set Subjects`,
  props<{ subjects: string }>(),
);
