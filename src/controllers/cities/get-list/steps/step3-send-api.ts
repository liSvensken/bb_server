import { CityModel } from '../../../../models/city/city.model';
import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetCitiesList } from '../interfaces/steps-result-get-cities-list';


export const step3SendApi = (callback: (err: ErrorInterface, statusCode: number, result: CityModel[], totalItems: number) => void,
                             stepsResults: StepsResultGetCitiesList) => {
  callback(null, 200, stepsResults.step1GetCitiesFromDb, stepsResults.step2GetTotalItems);
}
