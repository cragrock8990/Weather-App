import { Action, createReducer, on } from "@ngrx/store";

import * as Weather from "../actions/weather";
import { initialWeatherState, WeatherState } from "../state/weather";

const weatherReducer = createReducer(
  initialWeatherState,
  on(Weather.getWeatherSuccess, (state, { weather }) => {
    //
    // filtering array based on latest weather, all weathers which doesn't match the time span of the latest weather are removed
    //
    const filteredWeatherArray = state.weathers.filter(
      weatherItem => weatherItem.list[0].dt_txt === weather.list[0].dt_txt
    );
    return {
      ...state,
      weathers: [weather, ...filteredWeatherArray],
      error: null
    };
  }),
  on(Weather.getWeatherFailure, (state, { errorMessage }) => ({
    ...state,
    error: errorMessage
  }))
);

export function reducer(state: WeatherState | undefined, action: Action) {
  return weatherReducer(state, action);
}
