import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { parseMasterIdsStrInResponse } from '../../../common/steps/user/parse-master-ids-str-in-response';
import { StepsResultGetUsersList } from '../interfaces/steps-result-get-users-list.interface';
import { UserRole, UserRoleType } from '../../../../types/user-role.type';

export const step6ParseMasterIdsStrInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUsersList) => void,
                                                 role: UserRole, stepsResults: StepsResultGetUsersList) => {
  switch (true) {
    case role === UserRoleType.CLIENT:
      parseMasterIdsStrInResponse((err, statusCode, userRes) => {
        if (!err) {
          stepsResults.step2TransformUsersInResponse = userRes;
          callback(null, 200, stepsResults);
        } else {
          callback(err, statusCode, null);
        }
      }, stepsResults.step1GetUsersFromDb, stepsResults.step2TransformUsersInResponse);
      break;

    case role === UserRoleType.MASTER:
      callback(null, 200, stepsResults);
  }
}
