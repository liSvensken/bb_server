import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { parseCityFromUser } from '../../../common/steps/user/parse-city/parse-city-from-user';
import { StepsResultGetUserByToken } from '../interfaces/steps-result-get-user-by-token.interface';
import { parseCityFromUsersList } from '../../../common/steps/user/parse-city/parse-city-from-users-list';


export const step5ParseCityDbInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUserByToken) => void,
                                           stepsResults: StepsResultGetUserByToken) => {
  parseCityFromUsersList((err, statusCode, userRes) => {
    if (!err) {
      stepsResults.step3TransformUserDbInResponse = userRes;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, stepsResults.step2GetUserFromDb, stepsResults.step3TransformUserDbInResponse);
}
