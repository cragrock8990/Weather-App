import { Component, Input } from "@angular/core";

import { WeatherList } from "src/app/model/weather";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-cell-details",
  templateUrl: "./weather-cell-details.component.html",
  styleUrls: ["./weather-cell-details.component.scss"]
})
export class WeatherCellComponent {
  @Input() weatherListItem: WeatherList;

  weatherStateImgPathPrefix = environment.weatherStateImgUrlPrefix;
  
  constructor() {}
}
