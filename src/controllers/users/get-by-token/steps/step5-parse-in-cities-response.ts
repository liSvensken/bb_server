import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { parseCitiesInResponse } from '../../../common/steps/user/parse-cities-in-response';
import { StepsResultGetUserByToken } from '../interfaces/steps-result-get-user-by-token.interface';


export const step5ParseInCitiesResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUserByToken) => void,
                                           stepsResults: StepsResultGetUserByToken) => {
  parseCitiesInResponse((err, statusCode, userRes) => {
    if (!err) {
      stepsResults.step3ParseInUserResponse = userRes;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, stepsResults.step2GetUserFromDb, stepsResults.step3ParseInUserResponse);
}
