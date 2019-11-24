import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";

import { WeatherService } from "../../weather.service";
import {
  getWeatherFailure,
  getWeatherSuccess,
  WeatherAction
} from "../actions/weather";

@Injectable()
export class WeatherEffects {
  constructor(
    private weatherService: WeatherService,
    private actions$: Actions
  ) {}

  getWeather$ = createEffect(() =>
    this.actions$.pipe(
      ofType<any>(WeatherAction.GetWeather),
      mergeMap(action =>
        this.weatherService.searchWeatherForCity(action.searchCriteria).pipe(
          map(weather => getWeatherSuccess({ weather: weather })),
          catchError((error: HttpErrorResponse) =>
            of(getWeatherFailure({ errorMessage: error.error.message }))
          )
        )
      )
    )
  );
}
