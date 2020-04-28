import { Action, createAction, props } from '@ngrx/store';

export function isComponentAction(action: Action): action is Action & { componentId: string; } {
  return 'componentId' in action && typeof action['componentId'] === 'string';
}

export const increment = createAction(
  '[Counter] Increment Value',
  props<{ componentId: string; }>(),
);

export const decrement = createAction(
  '[Counter] Decrement Value',
  props<{ componentId: string; }>(),
)

export const startAutoIncrement = createAction(
  '[Counter] Auto Increment Value Start',
  props<{ componentId: string; }>(),
);

export const autoIncrementStarted = createAction(
  '[Counter] Auto Increment Started',
  props<{ componentId: string; }>(),
);

export const stopAutoIncrement = createAction(
  '[Counter] Stop Auto Increment Value',
  props<{ componentId: string; }>(),
)
