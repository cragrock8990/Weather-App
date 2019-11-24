import { HttpErrorResponse } from "@angular/common/http";
import { Actions } from "@ngrx/effects";
import { of, throwError } from "rxjs";

import { WeatherService } from "../../weather.service";
import { WeatherAction } from "../actions/weather";
import { WeatherEffects } from "./weather";

const searchCriteriaData = { cityName: "London" };

const mockWeatherService: any = {
  searchWeatherForCity: {}
};

const mockWeatherAction: any = of({
  type: WeatherAction.GetWeather,
  searchCriteria: searchCriteriaData
});

describe("Weather Effects", () => {
  let weatherEffects: WeatherEffects;

  beforeEach(() => {
    weatherEffects = new WeatherEffects(
      mockWeatherService as WeatherService,
      mockWeatherAction as Actions
    );
  });

  describe("get Weather effect", () => {

    it("should create", () => {
      expect(weatherEffects).toBeTruthy();
    });

    it("should return a get Weather success action", (done: DoneFn) => {
      const weatherData = { city: "London" } as any;

      spyOn(mockWeatherService, "searchWeatherForCity").and.returnValue(
        of(weatherData)
      );

      weatherEffects.getWeather$.subscribe((value: any) => {
        expect(value.type).toBe(WeatherAction.GetWeatherSuccess);
        expect(value.weather).toBe(weatherData);
        expect(mockWeatherService.searchWeatherForCity).toHaveBeenCalledWith(
          searchCriteriaData
        );
        done();
      });
    });

    it("should return a get Weather failure action", (done: DoneFn) => {
      const weatherErrorMessage = "City not found";
      const weatherError = new HttpErrorResponse({
        error: { message: weatherErrorMessage }
      });

      spyOn(mockWeatherService, "searchWeatherForCity").and.returnValue(
        throwError(weatherError)
      );

      weatherEffects.getWeather$.subscribe((value: any) => {
        expect(value.type).toBe(WeatherAction.GetWeatherFailure);
        expect(value.errorMessage).toBe(weatherErrorMessage);
        expect(mockWeatherService.searchWeatherForCity).toHaveBeenCalledWith(
          searchCriteriaData
        );
        done();
      });
    });

  });
});
