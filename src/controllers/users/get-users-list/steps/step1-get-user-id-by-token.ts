import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { getUserIdByToken } from '../../../common/steps/get-user-id-by-token';
import { StepsResultGetUsersList } from '../interfaces/steps-result-get-users-list.interface';

export const step1GetUserIdByToken = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUsersList) => void,
                                      token: string, stepsResults: StepsResultGetUsersList) => {
  getUserIdByToken((err, statusCode, result) => {
    if (!err) {
      stepsResults.step1GetUserIdByToken = result.id;
      callback(null, statusCode, stepsResults)
    } else {
      callback(err, statusCode, null)
    }
  }, token)
}
