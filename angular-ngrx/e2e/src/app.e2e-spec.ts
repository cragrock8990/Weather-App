import { AppPage } from "./app.po";

describe("workspace-project App", () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it("should display header title", () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual("The Weather App");
  });

  it("should see error on click search without city name", () => {
    page.clickSearchButton();
    expect(page.getErrorMessage()).toEqual("X Please provide a valid city");
  });

  it("should see error on click search with wrong city name", () => {
    page.setCityNameInInput("test");
    page.clickSearchButton();
    expect(page.getErrorMessage()).toEqual("X city not found");
  });

  it("should show table with two cities", (done: DoneFn) => {
    page.setCityNameInInput("London");
    page.clickSearchButton();
    page.weatherTableLoaded().then(() => {
      expect(page.getWeatherCitNameFormRow(0)).toEqual("London");

      page.setCityNameInInput("Paris");
      page.clickSearchButton();
      page.weatherTableLoaded().then(() => {
        expect(page.getWeatherCitNameFormRow(0)).toEqual("Paris");
        expect(page.getWeatherCitNameFormRow(1)).toEqual("London");
        done();
      });
    });
  });
});
