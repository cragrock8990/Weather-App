import { Weather } from "src/app/model/weather";

export interface AppState {
  weather: WeatherState;
}

export interface WeatherState {
  weather: Weather;
  weathers: Weather[];
  error: string;
}

export const initialWeatherState: WeatherState = {
  weathers: [],
  weather: null,
  error: null
};
