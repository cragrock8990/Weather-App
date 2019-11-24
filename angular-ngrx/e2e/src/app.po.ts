import { browser, by, element, protractor, ElementFinder } from "protractor";


export class AppPage {
  until = protractor.ExpectedConditions;
  waitTimeout = 3000;
  waitTimeoutMessage =
    "Wait timeout limit reached, element did not appear in the DOM";

  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css(".navbar-brand")).getText() as Promise<string>;
  }

  setCityNameInInput(cityName: string) {
    const cityNameInputElement = element(by.id("cityName"));
    cityNameInputElement.clear().then(() => {
      return cityNameInputElement.sendKeys(cityName);
    });
  }

  clickSearchButton() {
    return element(by.css("button.btn-search")).click();
  }

  getErrorMessage() {
    const errorElement = element(by.css("p.invalid-feedback"));
    return this.waitUnitPresent(errorElement).then(() => {
      return errorElement.getText();
    });
  }

  weatherTableLoaded() {
    return this.waitUnitPresent(this.getWeatherTable());
  }

  getWeatherTable() {
    return element(by.id("weatherTable"));
  }

  getWeatherCitNameFormRow(rowNumber: number) {
    return this.getFirstCellOfTableRow(rowNumber).then(element => {
      return element
        .all(by.css("p"))
        .get(0)
        .getText();
    });
  }

  getFirstCellOfTableRow(rowNumber: number) {
    const selectedRow = this.getWeatherTable()
      .element(by.tagName("tbody"))
      .all(by.tagName("tr"))
      .get(rowNumber);

    return this.waitUnitPresent(selectedRow).then(() => {
      return selectedRow.all(by.tagName("td")).get(0);
    });
  }

  waitUnitPresent(element: ElementFinder) {
    return browser.wait(
      this.until.presenceOf(element),
      this.waitTimeout,
      this.waitTimeoutMessage
    );
  }
}
