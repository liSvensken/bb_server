import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetUser } from '../interfaces/steps-result.interface';
import { parseCityIdsStrInResponse } from '../../../common/steps/user/parse-city-ids-str-in-response';


export const step6ParseCityIdsStrInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUser) => void,
                                               stepsResults: StepsResultGetUser) => {
  parseCityIdsStrInResponse((err, statusCode, userRes) => {
    if (!err) {
      stepsResults.step3TransformInUserResponse = userRes;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, stepsResults.step2GetUserFromDb, stepsResults.step3TransformInUserResponse);
}
