import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { CityModel } from '../../../../models/city/city.model';
import { StepsResultGetCity } from '../interfaces/steps-result-get-city';

export const step2SendApi = (callback: (err: ErrorInterface, statusCode: number, result: CityModel[]) => void,
                             stepsResults: StepsResultGetCity) => {
  callback(null, 200, stepsResults.step1GetCity);
}
