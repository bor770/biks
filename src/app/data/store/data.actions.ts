import { createAction, props } from '@ngrx/store';

import { FullDeployedResult } from '../data.model';

export const filter = createAction(
  `[Data] Filter`,
  props<{ filterString: string }>(),
);

export const pageEvent = createAction(
  `[Data] Page Event`,
  props<{ pageIndex: number }>(),
);

export const saveDeployedResult = createAction(
  `[Data] Save Deployed Result`,
  props<{ result: FullDeployedResult }>(),
);

export const selectRow = createAction(
  `[Data] Select Row`,
  props<{ index: number }>(),
);
