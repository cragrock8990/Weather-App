import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ResultsComponent } from './components/results/results.component';
import { WeatherCellComponent } from './components/results/weather-cell-details/weather-cell-details.component';
import { SearchComponent } from './components/search/search.component';
import { WeatherEffects } from './store/effects/weather';
import * as weatherReducer from './store/reducers/weather';
import { WeatherContainer } from './weather.container';
import { WeatherService } from './weather.service';
import { weatherFeatureKey } from './store';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature(weatherFeatureKey, weatherReducer.reducer),
    EffectsModule.forFeature([WeatherEffects])
  ],
  declarations: [
    WeatherCellComponent,
    SearchComponent,
    ResultsComponent,
    WeatherContainer
  ],
  providers: [ WeatherService ]
})
export class WeatherModule { }
