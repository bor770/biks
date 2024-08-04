import { createAction, props } from '@ngrx/store';

export const filter = createAction(
  `[Data] Filter`,
  props<{ filterString: string }>(),
);

export const pageEvent = createAction(
  `[Data] Page Event`,
  props<{ pageIndex: number }>(),
);

export const selectRow = createAction(
  `[Data] Select Row`,
  props<{ index: number }>(),
);
