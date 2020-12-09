import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { ServiceModel } from '../../../../models/service/service.model';
import { StepsResultGetServicesList } from '../interfaces/steps-result-get-services-list';

export const step3SendApi = (callback: (err: ErrorInterface, statusCode: number, result: ServiceModel[], totalItems: number) => void,
                             stepsResults: StepsResultGetServicesList) => {
  callback(null, 200, stepsResults.step1GetServicesFromDb, stepsResults.step2GetTotalItems);
}
