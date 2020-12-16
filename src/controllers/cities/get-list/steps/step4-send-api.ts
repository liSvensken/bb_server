import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetCitiesList } from '../interfaces/steps-result-get-cities-list';
import { GetCitiesListResponse } from '../interfaces/get-cities-list-response.interface';


export const step4SendApi = (callback: (err: ErrorInterface, statusCode: number, result: GetCitiesListResponse, totalItems: number) => void,
                             stepsResults: StepsResultGetCitiesList) => {
  callback(null, 200, stepsResults.step2GetCitiesFromDb, stepsResults.step3GetTotalItems);
}
