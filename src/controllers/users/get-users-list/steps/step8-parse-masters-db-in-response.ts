import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { parseMyMastersDbInResponse } from '../../../common/steps/user/parse-my-masters-db-in-response';
import { StepsResultGetUsersList } from '../interfaces/steps-result-get-users-list.interface';
import { UserRole, UserRoleType } from '../../../../types/user-role.type';

export const step8ParseMastersDbInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUsersList) => void,
                                              role: UserRole, stepsResults: StepsResultGetUsersList) => {
  parseMyMastersDbInResponse((err, statusCode, userRes) => {
    if (!err) {
      stepsResults.step4TransformUsersDbInResponse = userRes;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, role, stepsResults.step3GetUsersFromDb, stepsResults.step4TransformUsersDbInResponse);
}
