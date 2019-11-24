import { createSelector } from "@ngrx/store";

import { WeatherState, AppState } from "../state/weather";

const selectWeatherState = (state: AppState) => state.weather;

export const selectWeatherList = createSelector(
  selectWeatherState,
  (state: WeatherState) => state.weathers
);

export const selectWeatherError = createSelector(
  selectWeatherState,
  (state: WeatherState) => state.error
);
