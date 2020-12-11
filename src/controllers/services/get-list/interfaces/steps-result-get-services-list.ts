import { GetServicesListResponse } from './get-services-list-response.interface';

export interface StepsResultGetServicesList {
  step1GetServicesFromDb: GetServicesListResponse;
  step2GetTotalItems: number;
}
