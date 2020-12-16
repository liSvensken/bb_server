import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetUsersList } from '../interfaces/steps-result-get-users-list.interface';
import { parseServiceIdsStrInResponse } from '../../../common/steps/user/parse-service-ids-str-in-response';
import { UserRole, UserRoleType } from '../../../../types/user-role.type';

export const step3ParseServiceIdsStrInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUsersList) => void,
                                                  role: UserRole, stepsResults: StepsResultGetUsersList) => {
  switch (true) {
    case role === UserRoleType.MASTER:
      parseServiceIdsStrInResponse((err, statusCode, userRes) => {
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
      break;
  }
}
