import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Weather, SearchCriteria } from "../model/weather";
import { environment } from "src/environments/environment";

@Injectable()
export class WeatherService {
  url = environment.weatherApiUrl;
  params = {
    q: "",
    cnt: "8",
    units: "metric",
    APPID: "010721642521f31b0fbc8c3831d45951"
  };

  constructor(private httpClient: HttpClient) {}

  public searchWeatherForCity(searchCriteria: SearchCriteria): Observable<Weather> {
    const queryParam = { ...this.params, q: searchCriteria.cityName };
    return this.httpClient.get(this.url, { params: queryParam });
  }
}
