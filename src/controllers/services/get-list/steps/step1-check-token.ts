import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { getUserIdByToken } from '../../../common/steps/get-user-id-by-token';
import { StepsResultGetServicesList } from '../interfaces/steps-result-get-services-list';

export const step1CheckToken = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetServicesList) => void,
                                token: string, stepsResults: StepsResultGetServicesList) => {
  getUserIdByToken((err, statusCode) => {
    if (!err) {
      callback(null, statusCode, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, token)
}
