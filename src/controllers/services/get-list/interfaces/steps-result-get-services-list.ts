import { ServiceModel } from '../../../../models/service/service.model';

export interface StepsResultGetServicesList {
  step1GetServicesFromDb: ServiceModel[];
  step2GetTotalItems: number;
}
