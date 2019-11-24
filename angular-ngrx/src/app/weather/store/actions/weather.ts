import { createAction, props } from "@ngrx/store";

import { SearchCriteria, Weather } from "src/app/model/weather";

export enum WeatherAction {
  GetWeather = "[Weather] Get Weather",
  GetWeatherSuccess = "[Weather] Get Weather Success",
  GetWeatherFailure = "[Weather] Get Weather Failure"
}

export const getWeather = createAction(
  WeatherAction.GetWeather,
  props<{ searchCriteria: SearchCriteria }>()
);

export const getWeatherSuccess = createAction(
  WeatherAction.GetWeatherSuccess,
  props<{ weather: Weather }>()
);

export const getWeatherFailure = createAction(
  WeatherAction.GetWeatherFailure,
  props<{ errorMessage: string }>()
);
