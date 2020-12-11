import { GetCitiesListResponse } from './get-cities-list-response.interface';

export interface StepsResultGetCitiesList {
  step1GetCitiesFromDb: GetCitiesListResponse;
  step2GetTotalItems: number;
}
