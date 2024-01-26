import { CommonValues } from './common-values';

export interface City {
  _id?: string;
  cityName: string;
  values: CommonValues[];
}
