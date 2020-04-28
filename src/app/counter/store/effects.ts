import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CounterActions from './actions';
import { filter, mapTo, mergeMap, startWith, switchMap, take, takeUntil } from 'rxjs/operators';
import { EMPTY, interval, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsAutoIncrementStarted } from './selectors';

@Injectable()
export class CounterEffects {

  public autoIncrement = createEffect(() =>
    this.actions
      .pipe(
        ofType(CounterActions.startAutoIncrement),
        switchMap(action => {
          // Do not trigger autoIncrement multiple times
          return this.store.select(selectIsAutoIncrementStarted(action.componentId))
            .pipe(
              take(1),
              switchMap(isAutoIncrementStarted => isAutoIncrementStarted ? EMPTY : of(action)),
            )
        }),
        mergeMap(({ componentId }) => {
          const stopped$ = this.actions.pipe(
            ofType(CounterActions.stopAutoIncrement),
            filter(action => action.componentId === componentId),
            take(1),
          );

          return interval(1000)
            .pipe(
              mapTo(CounterActions.increment({ componentId })),
              startWith(CounterActions.autoIncrementStarted({ componentId })),
              takeUntil(stopped$),
            );
        })
      )
  );

  public constructor(
    private readonly actions: Actions,
    private readonly store: Store,
  ) {
  }
}
