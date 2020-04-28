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

  constructor(
    private readonly store: Store,
  ) { }

  ngOnInit(): void {
    this.value$ = this.store.select(selectCounterValue(this.componentId));
  }

  onIncrement() {
    this.store.dispatch(CounterActions.increment({ componentId: this.componentId }));
  }

  onDecrement() {
    this.store.dispatch(CounterActions.decrement({ componentId: this.componentId }));
  }
}
