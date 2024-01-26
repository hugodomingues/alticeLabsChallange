import { Injectable } from '@angular/core';
import moment from 'moment-timezone';

@Injectable({
  providedIn: 'root',
})
export class TimezoneService {
  constructor() {}
  getTimezones(): string[] {
    return moment.tz.names();
  }
}
