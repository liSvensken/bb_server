import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetCity } from '../interfaces/steps-result-get-city';
import { GetCityResponse } from '../interfaces/get-city-response.interface';

export const step3SendApi = (callback: (err: ErrorInterface, statusCode: number, result: GetCityResponse) => void,
                             stepsResults: StepsResultGetCity) => {
  callback(null, 200, stepsResults.step2GetCity);
}
