import { CityModel } from '../city.model';

export function isCities(param: any[]): param is CityModel[] {
  param.forEach(elem => {
    if (!((elem as CityModel).id) ||
        !((elem as CityModel).name)) {
      return false;
    }
  })
  return true;
}

export function isCity(param: any): param is CityModel {
  if (!((param as CityModel).id) ||
      !((param as CityModel).name)) {
    return false;
  }
}
