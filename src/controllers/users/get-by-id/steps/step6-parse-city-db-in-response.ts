import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetUser } from '../interfaces/steps-result.interface';
import { parseCityFromUsersList } from '../../../common/steps/user/parse-city/parse-city-from-users-list';


export const step6ParseCityDbInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUser) => void,
                                           stepsResults: StepsResultGetUser) => {
  parseCityFromUsersList((err, statusCode, userRes) => {
    if (!err) {
      stepsResults.step4TransformUserDbInResponse = userRes;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, stepsResults.step2GetUserFromDb, stepsResults.step4TransformUserDbInResponse);
}
