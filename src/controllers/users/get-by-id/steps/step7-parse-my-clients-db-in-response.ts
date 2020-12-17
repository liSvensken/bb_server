import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { parseMySubscriberInResponse } from '../../../common/steps/user/parse-my-subscriber-in-response';
import { StepsResultGetUser } from '../interfaces/steps-result.interface';

export const step7ParseMyClientsDbInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUser) => void,
                                                stepsResults: StepsResultGetUser) => {
  const role = stepsResults.step4TransformUserDbInResponse[0].role;

  parseMySubscriberInResponse((err, statusCode, userRes) => {
    if (!err) {
      stepsResults.step4TransformUserDbInResponse = userRes;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, role, stepsResults.step2GetUserFromDb, stepsResults.step4TransformUserDbInResponse);
}
