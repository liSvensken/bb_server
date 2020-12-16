import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetService } from '../interfaces/steps-result-get-service';
import { GetServiceResponse } from '../interfaces/get-service-response.interface';

export const step3SendApi = (callback: (err: ErrorInterface, statusCode: number, result: GetServiceResponse) => void,
                             stepsResults: StepsResultGetService) => {
  callback(null, 200, stepsResults.step2GetService);
}
