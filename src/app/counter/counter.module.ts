import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterContainerComponent } from './counter-container/counter-container.component';
import { StoreModule } from '@ngrx/store';
import { CounterEffects, featureKey, reducer } from './store';
import { EffectsModule } from '@ngrx/effects';



@NgModule({
  declarations: [CounterContainerComponent],
  exports: [
    CounterContainerComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(featureKey, reducer),
    EffectsModule.forFeature([CounterEffects]),
  ]
})
export class CounterModule { }
