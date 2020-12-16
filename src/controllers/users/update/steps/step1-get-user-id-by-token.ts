import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultUpdateUser } from '../interfaces/steps-result-update-user.interface';
import { getUserIdByToken } from '../../../common/steps/get-user-id-by-token';

export const step1GetUserIdByToken = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultUpdateUser) => void,
                                      token: string, stepsResults: StepsResultUpdateUser) => {
  getUserIdByToken((err, statusCode, result) => {
    if (!err) {
      stepsResults.step1GetUserIdByToken = result.id;
      callback(null, statusCode, stepsResults)
    } else {
      callback(err, statusCode, null)
    }
  }, token)
}
