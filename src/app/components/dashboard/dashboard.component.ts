import { Component, TemplateRef, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { City } from '../../interface/city';
import { CommonModule, NgIfContext } from '@angular/common';
import { CitiesServiceService } from '../../services/cities-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  cities: City[] = [];
  citiesService: CitiesServiceService = inject(CitiesServiceService);
  constructor() {
    //this.citiesService.getAllCities().then((result) => console.log(result));
  }
}
