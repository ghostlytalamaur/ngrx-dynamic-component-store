import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as Actions from './actions';

export const featureKey = 'counter';

export interface CounterState {
  id: string;
  value: number;
  isAutoIncrementStarted: boolean;
}

export interface State extends EntityState<CounterState> {
}

const adapter = createEntityAdapter<CounterState>();
const initialState = adapter.getInitialState();
export function getInitialCounterState(id: string): CounterState {
  return {
    id,
    value: 0,
    isAutoIncrementStarted: false,
  };
}

const counterReducer = createReducer(
  getInitialCounterState('dummy_id'),
  on(Actions.increment, state => ({
    ...state,
    value: state.value + 1,
  })),
  on(Actions.decrement, state => ({
    ...state,
    value: state.value - 1,
  })),
  on(Actions.autoIncrementStarted, state => ({
    ...state,
    isAutoIncrementStarted: true,
  })),
  on(Actions.stopAutoIncrement, state => ({
    ...state,
    isAutoIncrementStarted: false,
  })),
);

export function reducer(state: State = initialState, action: Action): State {
  if (Actions.isComponentAction(action)) {
    let counterState = state.entities[action.componentId];
    if (!counterState) {
      counterState = getInitialCounterState(action.componentId);
    }
    return adapter.upsertOne(counterReducer(counterState, action), state);
  }
  // here we may call counterReducer for each created CounterState if needed.

  return state;
}
