import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { SearchCriteria } from 'src/app/model/weather';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {
  @Input() errorMessage: string;
  @Output() searchCity = new EventEmitter<SearchCriteria>();
  @Output() resetError = new EventEmitter();

  criteriaFormGroup: FormGroup;
  cityNameFormControl: FormControl;

  constructor(private formBuilder: FormBuilder) { 
  
  this.criteriaFormGroup = this.formBuilder.group({
      cityName: [null, [Validators.required]]
    });

    this.cityNameFormControl = this.criteriaFormGroup.get('cityName') as FormControl;

    this.cityNameFormControl.valueChanges.subscribe(()=> {
      if(this.errorMessage) {
        this.resetError.emit();  
        }
    });
  }

  searchWeather() {
    if (this.criteriaFormGroup.valid){
      const searchCriteria= this.criteriaFormGroup.value as SearchCriteria;
      this.searchCity.emit(searchCriteria);
    }
    else {
      this.cityNameFormControl.markAsTouched();
    }
  }
}


