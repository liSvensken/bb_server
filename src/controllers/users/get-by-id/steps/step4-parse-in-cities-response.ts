import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetUser } from '../interfaces/steps-result.interface';
import { parseCitiesInResponse } from '../../../common/steps/user/parse-cities-in-response';


export const step4ParseInCitiesResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUser) => void,
                                           stepsResults: StepsResultGetUser) => {
  parseCitiesInResponse((err, statusCode, userRes) => {
    if (!err) {
      stepsResults.step2ParseInUserResponse = userRes;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, stepsResults.step1GetUserFromDb, stepsResults.step2ParseInUserResponse);
}
