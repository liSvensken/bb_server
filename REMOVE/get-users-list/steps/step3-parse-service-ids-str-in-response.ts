import { ErrorInterface } from '../../../src/utils/errors/error.interface';
import { StepsResultGetUsersList } from '../interfaces/steps-result-get-users-list.interface';
import { parseServiceIdsStrInResponse } from '../../../src/controllers/common/steps/user/parse-service-ids-str-in-response';

export const step3ParseServiceIdsStrInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUsersList) => void,
                                                  stepsResults: StepsResultGetUsersList) => {
  parseServiceIdsStrInResponse((err, statusCode, userRes) => {
    if (!err) {
      stepsResults.step2TransformUsersInResponse = userRes;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, stepsResults.step1GetUsersFromDb, stepsResults.step2TransformUsersInResponse);
}
