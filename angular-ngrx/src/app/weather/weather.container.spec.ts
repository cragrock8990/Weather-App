import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { getWeather, getWeatherFailure } from './store/actions/weather';
import { AppState } from './store/state/weather';
import { WeatherContainer } from './weather.container';

describe('WeatherContainer', () => {
  let component: WeatherContainer;
  let fixture: ComponentFixture<WeatherContainer>;
  let store: MockStore<AppState>;
  const errorMessage= 'city not found';
  const weathersList=[{city: 'aaa'}]  as any[];

  const initialState = { weather:{
    weathers: weathersList ,
    weather: null,
    error: errorMessage
  }};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherContainer ],
      imports: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [ provideMockStore({ initialState })]
    })
    .compileComponents();
    store = TestBed.get(Store);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the error message if exist in the store', (done: DoneFn) => {
    component.error$.subscribe((error)=> {
      expect(error).toEqual('city not found');
      done();
    });
  });

  it('should set the weathers array if exist in the store', (done: DoneFn) => {
    component.weather$.subscribe((weathers)=> {
      expect(weathers).toEqual(weathersList) ;
      done();
    });
  });

  it('should dispatch event on city search event', () => {
    spyOn(store, 'dispatch');

    const searchCriteria= {cityName: 'london'};
    component.onCitySearch(searchCriteria);

    const citySearchDispatchAction= getWeather({searchCriteria: searchCriteria});
    expect(store.dispatch).toHaveBeenCalledWith(citySearchDispatchAction);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  it('should dispatch event on reset error event', () => {
    spyOn(store, 'dispatch');

    component.onResetError();

    const resetErrorDispatchAction= getWeatherFailure({errorMessage : null});
    expect(store.dispatch).toHaveBeenCalledWith(resetErrorDispatchAction);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

});
