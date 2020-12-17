import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { parseMySubscriberInResponse } from '../../../common/steps/user/parse-my-subscriber-in-response';
import { StepsResultGetUserByToken } from '../interfaces/steps-result-get-user-by-token.interface';

export const step6ParseMyClientsDbInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUserByToken) => void,
                                                stepsResults: StepsResultGetUserByToken) => {
  const role = stepsResults.step3TransformUserDbInResponse[0].role;

  parseMySubscriberInResponse((err, statusCode, userRes) => {
    if (!err) {
      stepsResults.step3TransformUserDbInResponse = userRes;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, role, stepsResults.step2GetUserFromDb, stepsResults.step3TransformUserDbInResponse);
}
