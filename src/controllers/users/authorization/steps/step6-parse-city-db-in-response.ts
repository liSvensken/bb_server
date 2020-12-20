import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { parseCityFromUser } from '../../../common/steps/user/parse-city/parse-city-from-user';
import { StepsResultAuthorization } from '../interfaces/steps-result-authorization.interface';
import { parseCityFromUsersList } from '../../../common/steps/user/parse-city/parse-city-from-users-list';


export const step6ParseCityDbInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultAuthorization) => void,
                                           stepsResults: StepsResultAuthorization) => {

  parseCityFromUsersList((err, statusCode, userRes) => {
    if (!err) {
      stepsResults.step4TransformUserDbInResponse = userRes;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, stepsResults.step1GetUserFromDb, stepsResults.step4TransformUserDbInResponse);
}
