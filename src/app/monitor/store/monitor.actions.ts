import { createAction, props } from '@ngrx/store';

export const setFailed = createAction(
  `[Monitor] Set Failed`,
  props<{ failed: boolean }>(),
);

export const setIds = createAction(
  `[Monitor] Set Ids`,
  props<{ ids: string }>(),
);

export const setNames = createAction(
  `[Monitor] Set Names`,
  props<{ names: string }>(),
);

export const setPassed = createAction(
  `[Monitor] Set Passed`,
  props<{ passed: boolean }>(),
);
