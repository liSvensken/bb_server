import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetServicesList } from '../interfaces/steps-result-get-services-list';
import { GetServicesListResponse } from '../interfaces/get-services-list-response.interface';

export const step4SendApi = (callback: (err: ErrorInterface, statusCode: number, result: GetServicesListResponse, totalItems: number) => void,
                             stepsResults: StepsResultGetServicesList) => {
  callback(null, 200, stepsResults.step2GetServicesFromDb, stepsResults.step3GetTotalItems);
}
