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
import { Router, RouterLink } from '@angular/router';

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
  router: Router = new Router();

  date = new FormControl(new Date());
  cityDetails = new FormGroup({
    cityName: new FormControl(''),
    temperature: new FormControl(0, [Validators.required]),
    rainingStatus: new FormControl(false),
    date: this.date,
    networkPower: new FormControl(1),
    altitude: new FormControl(0),
  });

  async onSubmit() {
    //first check if we already have data on the city selected
    const cities = await this.citiesService.getAllCities();
    if (
      cities &&
      cities.find(
        (city) => city.cityName === this.cityDetails.controls.cityName.value
      )
    ) {
      const cityToUpdate = cities.find(
        (city) => city.cityName === this.cityDetails.controls.cityName.value
      );
      if (cityToUpdate) {
        const newObject = {
          cityName: cityToUpdate.cityName,
          values: [
            ...cityToUpdate.values,
            {
              temperature: this.cityDetails.controls.temperature.value ?? 0,
              rainingStatus:
                this.cityDetails.controls.rainingStatus.value ?? false,
              networkPower: this.cityDetails.controls.networkPower.value ?? 1,
              altitude: this.cityDetails.controls.networkPower.value ?? 0,
              date: this.date.value ?? new Date(),
            },
          ],
        };
        this.citiesService.updateCity(cityToUpdate._id ?? '', newObject);
      }
    } else {
      const dataToSubmit: City = {
        cityName: this.cityDetails.controls.cityName.value ?? '',
        values: [
          {
            temperature: this.cityDetails.controls.temperature.value ?? 0,
            rainingStatus:
              this.cityDetails.controls.rainingStatus.value ?? false,
            networkPower: this.cityDetails.controls.networkPower.value ?? 1,
            altitude: this.cityDetails.controls.networkPower.value ?? 0,
            date: this.date.value ?? new Date(),
          },
        ],
      };

      this.citiesService.addNewCity(dataToSubmit);
    }
    this.cityDetails.reset();
    this.router.navigateByUrl('/');
  }
}
