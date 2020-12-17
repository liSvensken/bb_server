import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { parseMyMastersDbInResponse } from '../../../common/steps/user/parse-my-masters-db-in-response';
import { UserRole, UserRoleType } from '../../../../types/user-role.type';
import { StepsResultGetUser } from '../interfaces/steps-result.interface';

export const step8ParseMyMastersDbInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUser) => void,
                                                stepsResults: StepsResultGetUser) => {

  const role = stepsResults.step4TransformUserDbInResponse[0].role;

  parseMyMastersDbInResponse((err, statusCode, userRes) => {
    if (!err) {
      stepsResults.step4TransformUserDbInResponse = userRes;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, role, stepsResults.step2GetUserFromDb, stepsResults.step4TransformUserDbInResponse);
}
