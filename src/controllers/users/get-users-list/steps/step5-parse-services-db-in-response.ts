import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetUsersList } from '../interfaces/steps-result-get-users-list.interface';
import { parseServicesDbInResponse } from '../../../common/steps/user/parse-services-db-in-response';
import { UserRole, UserRoleType } from '../../../../types/user-role.type';

export const step5ParseServicesDbInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUsersList) => void,
                                               role: UserRole, stepsResults: StepsResultGetUsersList) => {
  switch (true) {
    case role === UserRoleType.MASTER:
      parseServicesDbInResponse((err, statusCode, userRes) => {
        if (!err) {
          stepsResults.step4TransformUsersDbInResponse = userRes;
          callback(null, 200, stepsResults);
        } else {
          callback(err, statusCode, null);
        }
      }, stepsResults.step3GetUsersFromDb, stepsResults.step4TransformUsersDbInResponse);
      break;

    case role === UserRoleType.CLIENT:
      callback(null, 200, stepsResults);
      break;
  }
}
