import { CityModel } from '../../../../models/city/city.model';

export interface StepsResultGetCitiesList {
  step1GetCitiesFromDb: CityModel[];
  step2GetTotalItems: number;
}
