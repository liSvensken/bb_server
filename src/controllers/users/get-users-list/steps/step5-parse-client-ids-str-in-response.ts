import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetUsersList } from '../interfaces/steps-result-get-users-list.interface';
import { parseClientIdsStrInResponse } from '../../../common/steps/user/parse-client-ids-str-in-response';
import { UserRole, UserRoleType } from '../../../../types/user-role.type';

export const step5ParseClientIdsStrInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUsersList) => void,
                                                 role: UserRole, stepsResults: StepsResultGetUsersList) => {
  switch (true) {
    case role === UserRoleType.MASTER:
      parseClientIdsStrInResponse((err, statusCode, userRes) => {
        if (!err) {
          stepsResults.step2TransformUsersInResponse = userRes;
          callback(null, 200, stepsResults);
        } else {
          callback(err, statusCode, null);
        }
      }, stepsResults.step1GetUsersFromDb, stepsResults.step2TransformUsersInResponse);
      break;

    case role === UserRoleType.CLIENT:
      callback(null, 200, stepsResults);
  }
}
