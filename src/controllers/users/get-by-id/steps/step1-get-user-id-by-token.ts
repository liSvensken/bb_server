import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { getUserIdByToken } from '../../../common/steps/get-user-id-by-token';
import { StepsResultGetUser } from '../interfaces/steps-result.interface';

export const step1GetUserIdByToken = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUser) => void,
                                      token: string, stepsResults: StepsResultGetUser) => {
  getUserIdByToken((err, statusCode, result) => {
    if (!err) {
      stepsResults.step1GetUserIdByToken = result.id;
      callback(null, statusCode, stepsResults)
    } else {
      callback(err, statusCode, null)
    }
  }, token)
}
