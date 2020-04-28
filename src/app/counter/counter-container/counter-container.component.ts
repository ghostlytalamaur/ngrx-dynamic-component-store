import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CounterActions, selectCounterValue } from '../store';

@Component({
  selector: 'app-counter-container',
  templateUrl: './counter-container.component.html',
  styleUrls: ['./counter-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterContainerComponent implements OnInit {
  private readonly componentId: string = `${Date.now() * Math.random()}`;

  public value$: Observable<number>;

  public constructor(
    private readonly store: Store,
  ) {
  }

  public ngOnInit(): void {
    this.value$ = this.store.select(selectCounterValue(this.componentId));
  }

  public onIncrement(): void {
    this.store.dispatch(CounterActions.increment({ componentId: this.componentId }));
  }

  public onDecrement(): void {
    this.store.dispatch(CounterActions.decrement({ componentId: this.componentId }));
  }

  public onStartAutoIncrement(): void {
    this.store.dispatch(CounterActions.startAutoIncrement({ componentId: this.componentId }));
  }

  public onStopAutoIncrement(): void {
    this.store.dispatch(CounterActions.stopAutoIncrement({ componentId: this.componentId }));
  }
}
