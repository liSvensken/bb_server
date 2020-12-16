import { GetServicesListResponse } from './get-services-list-response.interface';

export interface StepsResultGetServicesList {
  step2GetServicesFromDb: GetServicesListResponse;
  step3GetTotalItems: number;
}
