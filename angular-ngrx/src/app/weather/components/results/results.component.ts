import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";

import { Weather, WeatherTableColumns } from "src/app/model/weather";

@Component({
  selector: "app-results",
  templateUrl: "./results.component.html"
})
export class ResultsComponent implements OnChanges {
  @Input() weathers: Weather[];

  weatherTableColumns: WeatherTableColumns;
  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.weathers && changes.weathers.currentValue && !changes.weathers.firstChange) {
      if (this.weathers.length > 0) {
        this.weatherTableColumns = {
          firstColumn: this.weathers[0].list[0].dt_txt,
          secondColumn: this.weathers[0].list[2].dt_txt,
          thirdColumn: this.weathers[0].list[4].dt_txt,
          fourthColumn: this.weathers[0].list[6].dt_txt
        };
      }
    }
  }
}
