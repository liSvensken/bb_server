import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { parseCityIdsStrInResponse } from '../../../common/steps/user/parse-city-ids-str-in-response';
import { StepsResultGetUserByToken } from '../interfaces/steps-result-get-user-by-token.interface';


export const step5ParseInCitiesResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUserByToken) => void,
                                           stepsResults: StepsResultGetUserByToken) => {
  parseCityIdsStrInResponse((err, statusCode, userRes) => {
    if (!err) {
      stepsResults.step3TransformInUserResponse = userRes;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, stepsResults.step2GetUserFromDb, stepsResults.step3TransformInUserResponse);
}
