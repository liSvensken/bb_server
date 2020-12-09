import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { ServiceModel } from '../../../../models/service/service.model';
import { StepsResultGetService } from '../interfaces/steps-result-get-service';

export const step2SendApi = (callback: (err: ErrorInterface, statusCode: number, result: ServiceModel[]) => void,
                             stepsResults: StepsResultGetService) => {
  callback(null, 200, stepsResults.step1GetService);
}
