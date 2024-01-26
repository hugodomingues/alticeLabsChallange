import { Injectable } from '@angular/core';
import axios from 'axios';
import { City } from '../interface/city';

@Injectable({
  providedIn: 'root',
})
export class CitiesServiceService {
  constructor() {}

  instance = axios.create({
    baseURL: 'https://crudcrud.com/api/076402a85eab459a937a0dcc1d10bcd3',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  async getAllCities(): Promise<City[]> {
    const cities = await this.instance.get('/cities');
    return cities.data ?? [];
  }

  async addNewCity(city: City) {
    await this.instance.post('/cities', city);
  }

  async getCityDetails(id: string) {
    const city = await this.instance.get(`/cities/${id}`);
    return city.data ?? {};
  }
  async updateCity(id: string, city: City) {
    await this.instance.put(`/cities/${id}`, city);
  }
}
