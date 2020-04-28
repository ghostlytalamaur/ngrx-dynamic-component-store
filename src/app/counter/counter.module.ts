import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterContainerComponent } from './counter-container/counter-container.component';
import { StoreModule } from '@ngrx/store';
import { featureKey, reducer } from './store';



@NgModule({
  declarations: [CounterContainerComponent],
  exports: [
    CounterContainerComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(featureKey, reducer),
  ]
})
export class CounterModule { }
