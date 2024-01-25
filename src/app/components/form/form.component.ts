import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { allCities } from './../../interface/allCities';
import { CitiesServiceService } from '../../services/cities-service.service';
import { City } from './../../interface/city';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatDatepickerModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  allCitiesData = allCities;
  citiesService: CitiesServiceService = inject(CitiesServiceService);

  date = new FormControl(new Date());
  cityDetails = new FormGroup({
    cityName: new FormControl(''),
    temperature: new FormControl(0, [Validators.required]),
    rainingStatus: new FormControl(false),
    date: this.date,
    networkPower: new FormControl(1),
    altitude: new FormControl(0),
  });

  onSubmit() {
    const dataToSubmit: City = {
      cityName: this.cityDetails.controls.cityName.value ?? '',
      values: [
        {
          temperature: this.cityDetails.controls.temperature.value ?? 0,
          rainingStatus: this.cityDetails.controls.rainingStatus.value ?? false,
          networkPower: this.cityDetails.controls.networkPower.value ?? 1,
          altitude: this.cityDetails.controls.networkPower.value ?? 0,
          date: this.date.value ?? new Date(),
        },
      ],
    };
    console.log(dataToSubmit);
    this.citiesService.addNewCity(dataToSubmit);
  }
}
