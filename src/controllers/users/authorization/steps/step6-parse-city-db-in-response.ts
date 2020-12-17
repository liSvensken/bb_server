import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { parseCityDbInResponse } from '../../../common/steps/user/parse-city-db-in-response';
import { StepsResultAuthorization } from '../interfaces/steps-result-authorization.interface';


export const step6ParseCityDbInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultAuthorization) => void,
                                           stepsResults: StepsResultAuthorization) => {
  parseCityDbInResponse((err, statusCode, userRes) => {
    if (!err) {
      stepsResults.step4TransformUserDbInResponse = userRes;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, stepsResults.step1GetUserFromDb, stepsResults.step4TransformUserDbInResponse);
}
