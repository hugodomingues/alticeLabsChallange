import { allCities } from '../interface/allCities';

export const convertCityCodeToName = (cityCode: string): string => {
  const city = allCities.find((city) => city.code === cityCode);
  if (city) {
    return city.name;
  } else {
    return cityCode;
  }
};
