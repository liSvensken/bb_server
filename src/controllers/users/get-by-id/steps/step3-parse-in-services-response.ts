import { parseServicesInResponse } from '../../../common/steps/user/parse-services-in-response';
import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetUser } from '../interfaces/steps-result.interface';


export const step3ParseInServicesResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUser) => void,
                                             stepsResults: StepsResultGetUser) => {
  console.log(stepsResults.step1GetUserFromDb)
  parseServicesInResponse((err, statusCode, userRes) => {
    if (!err) {
      stepsResults.step2ParseInUserResponse = userRes;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, stepsResults.step1GetUserFromDb, stepsResults.step2ParseInUserResponse);
}
