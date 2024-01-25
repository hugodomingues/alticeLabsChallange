import { Injectable } from '@angular/core';
import axios from 'axios';
import { City } from '../interface/city';

@Injectable({
  providedIn: 'root',
})
export class CitiesServiceService {
  constructor() {}

  instance = axios.create({
    baseURL: 'https://crudcrud.com/api/1e021346a6a248b38c7cc1e34768bc87',
  });

  async getAllCities() {
    const cities = await this.instance.get('/cities');
    return cities.data ?? [];
  }

  async addNewCity(city: City) {
    await this.instance.post('/cities', city);
  }
}
