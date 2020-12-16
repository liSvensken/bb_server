import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetUser } from '../interfaces/steps-result.interface';
import { parseCityIdsStrInResponse } from '../../../common/steps/user/parse-city-ids-str-in-response';


export const step4ParseCityIdsStrInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUser) => void,
                                               stepsResults: StepsResultGetUser) => {
  parseCityIdsStrInResponse((err, statusCode, userRes) => {
    if (!err) {
      stepsResults.step2TransformInUserResponse = userRes;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, stepsResults.step1GetUserFromDb, stepsResults.step2TransformInUserResponse);
}
