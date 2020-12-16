import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetUsersList } from '../interfaces/steps-result-get-users-list.interface';
import { parseCityIdsStrInResponse } from '../../../common/steps/user/parse-city-ids-str-in-response';

export const step6ParseCityIdsStrInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUsersList) => void,
                                               stepsResults: StepsResultGetUsersList) => {
  parseCityIdsStrInResponse((err, statusCode, userRes) => {
    if (!err) {
      stepsResults.step3TransformUsersInResponse = userRes;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, stepsResults.step3GetUsersFromDb, stepsResults.step3TransformUsersInResponse);
}
