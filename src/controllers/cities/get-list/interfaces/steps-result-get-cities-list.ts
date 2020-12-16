import { GetCitiesListResponse } from './get-cities-list-response.interface';

export interface StepsResultGetCitiesList {
  step2GetCitiesFromDb: GetCitiesListResponse;
  step3GetTotalItems: number;
}
