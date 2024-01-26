import { Component, TemplateRef, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { City } from '../../interface/city';
import { CommonModule, NgIfContext } from '@angular/common';
import { CitiesServiceService } from '../../services/cities-service.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { convertCityCodeToName } from '../../utils';
import { citiesAddOnAPI } from '../../interface/allCities';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    FormsModule,
    RouterLink,
    MatButtonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  cities: City[] = [];
  citiesService: CitiesServiceService = inject(CitiesServiceService);

  constructor() {
    this.citiesService.getAllCities().then((result) => (this.cities = result));
  }
  convertToName = (code: string) => {
    return convertCityCodeToName(code);
  };

  averageTemp = (city: City) => {
    const sum = city.values.reduce(
      (accumulator, currentValue) => accumulator + currentValue.temperature,
      0
    );
    const average = sum / city.values.length;
    return average.toFixed(2);
  };

  averageNP = (city: City) => {
    const sum = city.values.reduce(
      (accumulator, currentValue) => accumulator + currentValue.networkPower,
      0
    );
    const average = sum / city.values.length;
    return Math.trunc(average);
  };
}
