import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { SearchCriteria } from '../model/weather';
import { getWeather, getWeatherFailure } from './store/actions/weather';
import { selectWeatherError, selectWeatherList } from './store/selectors/weather';
import { AppState } from './store/state/weather';

@Component({
  selector: 'app-container',
  template: `
  <app-search [errorMessage]="error$ | async" (searchCity)="onCitySearch($event)" (resetError)="onResetError()"></app-search>
  <app-results [weathers]="weather$ | async" ></app-results>`
})
export class WeatherContainer {

  weather$ = this.store.pipe(select(selectWeatherList));
  error$ = this.store.pipe(select(selectWeatherError));

  constructor(private store: Store<AppState>) {}

  onCitySearch(searchCriteria: SearchCriteria) {
    this.store.dispatch(getWeather({searchCriteria: searchCriteria}))
  }

  onResetError(){
    this.store.dispatch(getWeatherFailure({errorMessage : null}))
  }
}
