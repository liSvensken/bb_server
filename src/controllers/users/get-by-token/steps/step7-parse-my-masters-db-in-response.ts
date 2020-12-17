import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { parseMyMastersDbInResponse } from '../../../common/steps/user/parse-my-masters-db-in-response';
import { StepsResultGetUserByToken } from '../interfaces/steps-result-get-user-by-token.interface';

export const step7ParseMyMastersDbInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUserByToken) => void,
                                                stepsResults: StepsResultGetUserByToken) => {

  const role = stepsResults.step3TransformUserDbInResponse[0].role;

  parseMyMastersDbInResponse((err, statusCode, userRes) => {
    if (!err) {
      stepsResults.step3TransformUserDbInResponse = userRes;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, role, stepsResults.step2GetUserFromDb, stepsResults.step3TransformUserDbInResponse);
}
