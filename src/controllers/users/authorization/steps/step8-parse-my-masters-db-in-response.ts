import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { parseMyMastersDbInResponse } from '../../../common/steps/user/parse-my-masters-db-in-response';
import { UserRoleType } from '../../../../types/user-role.type';
import { StepsResultAuthorization } from '../interfaces/steps-result-authorization.interface';

export const step8ParseMyMastersDbInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultAuthorization) => void,
                                                stepsResults: StepsResultAuthorization) => {

  const role = stepsResults.step4TransformUserDbInResponse[0].role;

  parseMyMastersDbInResponse((err, statusCode, userRes) => {
    if (!err) {
      stepsResults.step4TransformUserDbInResponse = userRes;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, role, stepsResults.step1GetUserFromDb, stepsResults.step4TransformUserDbInResponse);
}
