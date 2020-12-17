import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { getUserIdByToken } from '../../../common/steps/get-user-id-by-token';
import { StepsResultGetService } from '../interfaces/steps-result-get-service';

export const step1CheckToken = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetService) => void,
                                token: string, stepsResults: StepsResultGetService) => {
  getUserIdByToken((err, statusCode) => {
    if (!err) {
      callback(null, statusCode, stepsResults)
    } else {
      callback(err, statusCode, null)
    }
  }, token)
}
