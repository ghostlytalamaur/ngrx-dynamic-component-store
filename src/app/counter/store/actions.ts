import { Action, createAction, props } from '@ngrx/store';

export function isComponentAction(action: Action): action is Action & { componentId: string; } {
  return 'componentId' in action && typeof action['componentId'] === 'string';
}

export const increment = createAction(
  'Increment Value',
  props<{ componentId: string; }>(),
);

export const decrement = createAction(
  'Decrement Value',
  props<{ componentId: string; }>(),
)
