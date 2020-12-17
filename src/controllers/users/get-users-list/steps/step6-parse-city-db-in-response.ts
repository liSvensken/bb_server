import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetUsersList } from '../interfaces/steps-result-get-users-list.interface';
import { parseCityDbInResponse } from '../../../common/steps/user/parse-city-db-in-response';

export const step6ParseCityDbInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUsersList) => void,
                                           stepsResults: StepsResultGetUsersList) => {
  parseCityDbInResponse((err, statusCode, userRes) => {
    if (!err) {
      stepsResults.step4TransformUsersDbInResponse = userRes;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, stepsResults.step3GetUsersFromDb, stepsResults.step4TransformUsersDbInResponse);
}
