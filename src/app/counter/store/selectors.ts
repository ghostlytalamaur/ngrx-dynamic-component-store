import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCounter from './reducer';

const selectCountersState = createFeatureSelector<fromCounter.State>(fromCounter.featureKey);
const selectRawCounterState = (componentId: string) => createSelector(
  selectCountersState,
  state => state.entities[componentId],
);

const selectCounterState = (componentId: string) => createSelector(
  selectRawCounterState(componentId),
  state => state ?? fromCounter.getInitialCounterState(componentId),
);

export const selectCounterValue = (componentId: string) => createSelector(
  selectCounterState(componentId),
  state => state.value,
);

export const selectIsAutoIncrementStarted = (componentId: string) => createSelector(
  selectCounterState(componentId),
  state => state.isAutoIncrementStarted,
)
