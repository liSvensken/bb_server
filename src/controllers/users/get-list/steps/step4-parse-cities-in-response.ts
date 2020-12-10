import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetUsersList } from '../interfaces/steps-result-get-users-list.interface';
import { parseCitiesInResponse } from '../../../common/steps/user/parse-cities-in-response';

export const step4ParseCitiesInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUsersList) => void,
                                             stepsResults: StepsResultGetUsersList) => {
  parseCitiesInResponse((err, statusCode, userRes) => {
    if (!err) {
      stepsResults.step2ParseUsersInResponse = userRes;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, stepsResults.step1GetUsersFromDb, stepsResults.step2ParseUsersInResponse);
}
