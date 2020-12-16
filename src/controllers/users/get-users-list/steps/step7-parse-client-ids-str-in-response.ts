import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetUsersList } from '../interfaces/steps-result-get-users-list.interface';
import { parseClientIdsStrInResponse } from '../../../common/steps/user/parse-client-ids-str-in-response';
import { UserRole, UserRoleType } from '../../../../types/user-role.type';

export const step7ParseClientIdsStrInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUsersList) => void,
                                                 role: UserRole, stepsResults: StepsResultGetUsersList) => {
  switch (true) {
    case role === UserRoleType.MASTER:
      parseClientIdsStrInResponse((err, statusCode, userRes) => {
        if (!err) {
          stepsResults.step3TransformUsersInResponse = userRes;
          callback(null, 200, stepsResults);
        } else {
          callback(err, statusCode, null);
        }
      }, stepsResults.step3GetUsersFromDb, stepsResults.step3TransformUsersInResponse);
      break;

    case role === UserRoleType.CLIENT:
      callback(null, 200, stepsResults);
  }
}
