import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { parseCityIdsStrInResponse } from '../../../common/steps/user/parse-city-ids-str-in-response';
import { StepsResultAuthorization } from '../interfaces/steps-result-authorization.interface';


export const step6ParseCityIdsStrInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultAuthorization) => void,
                                               stepsResults: StepsResultAuthorization) => {
  parseCityIdsStrInResponse((err, statusCode, userRes) => {
    if (!err) {
      stepsResults.step4TransformInUserResponse = userRes;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, stepsResults.step1GetUserFromDb, stepsResults.step4TransformInUserResponse);
}
