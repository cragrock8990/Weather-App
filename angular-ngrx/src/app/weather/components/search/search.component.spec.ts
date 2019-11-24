import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { SearchCriteria } from 'src/app/model/weather';
import { SearchComponent } from './search.component';


import Spy = jasmine.Spy;

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check the label for city name input', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('form .form-group label').textContent).toContain('City Name');
  });

  it('should press search without city name', async(()  => {
    const compiled = fixture.debugElement.nativeElement;
    //
    // get the search button and click
    //
    const searchButton: HTMLInputElement= compiled.querySelector('button.btn-search');
    expect(searchButton.textContent).toContain('Search')

    searchButton.click();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const requiredErrorMessage: HTMLInputElement= compiled.querySelector('p.invalid-feedback');     
     expect(requiredErrorMessage.textContent).toBe('X Please provide a valid city');
    })

  }));

  it('should show error when given city is not found', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    //
    // get the input field and type incorrect city name
    //
    const cityNameInput: HTMLInputElement= compiled.querySelector('form .form-group #cityName');
    const cityName = 'ee';
    cityNameInput.value = cityName;
    cityNameInput.dispatchEvent(new Event('input'));
    component.errorMessage= 'City not found';
    //
    // get the search button and click
    //
    const searchButton: HTMLInputElement= compiled.querySelector('button.btn-search');
    expect(searchButton.textContent).toContain('Search')

    searchButton.click();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const requiredErrorMessage: HTMLInputElement= compiled.querySelector('p.invalid-feedback');     
     expect(requiredErrorMessage.textContent).toBe('X City not found');
    })

  }));

  it('should remove city not found error when input value changes', (done: DoneFn)  => {
    spyOn(component.resetError, 'emit');

    component.errorMessage= 'City not found';

    const compiled = fixture.debugElement.nativeElement;
    //
    // get the input field
    //
    const cityNameInput: HTMLInputElement= compiled.querySelector('form .form-group #cityName');
    const cityName = 'ee';
    cityNameInput.value = cityName;
    cityNameInput.dispatchEvent(new Event('input'));

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.resetError.emit).toHaveBeenCalled();
      done();
    })
  });

  it('should emit search when a city is typed and search button is pressed', (done: DoneFn)  => {
    spyOn(component.searchCity, 'emit');

    const compiled = fixture.debugElement.nativeElement;
    const cityNameInput: HTMLInputElement= compiled.querySelector('form .form-group #cityName');
    const cityName = 'london';
    cityNameInput.value = cityName;
    cityNameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const searchButton: HTMLInputElement= compiled.querySelector('button.btn-search');
    expect(searchButton.textContent).toContain('Search')
    searchButton.click();


    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const searchCriteria= component.criteriaFormGroup.value as SearchCriteria;
      expect(component.searchCity.emit).toHaveBeenCalledWith(searchCriteria);
      done();
    })

  });

});
