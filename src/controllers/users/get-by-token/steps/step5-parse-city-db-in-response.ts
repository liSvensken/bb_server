import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { parseCityDbInResponse } from '../../../common/steps/user/parse-city-db-in-response';
import { StepsResultGetUserByToken } from '../interfaces/steps-result-get-user-by-token.interface';


export const step5ParseCityDbInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUserByToken) => void,
                                           stepsResults: StepsResultGetUserByToken) => {
  parseCityDbInResponse((err, statusCode, userRes) => {
    if (!err) {
      stepsResults.step3TransformUserDbInResponse = userRes;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, stepsResults.step2GetUserFromDb, stepsResults.step3TransformUserDbInResponse);
}
