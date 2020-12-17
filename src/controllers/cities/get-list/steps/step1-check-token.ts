import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { getUserIdByToken } from '../../../common/steps/get-user-id-by-token';
import { StepsResultGetCitiesList } from '../interfaces/steps-result-get-cities-list';

export const step1CheckToken = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetCitiesList) => void,
                                token: string, stepsResults: StepsResultGetCitiesList) => {
  getUserIdByToken((err, statusCode) => {
    if (!err) {
      callback(null, statusCode, stepsResults)
    } else {
      callback(err, statusCode, null);
    }
  }, token)
}
