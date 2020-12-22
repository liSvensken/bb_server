import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetUsersList } from '../interfaces/steps-result-get-users-list.interface';
import { parseServicesFromUsersList } from '../../../common/steps/user/parse-services/parse-services-from-users-list';
import { UserRole, UserRoleType } from '../../../../types/user-role.type';

export const step5ParseServicesDbInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUsersList) => void,
                                               stepsResults: StepsResultGetUsersList) => {

  parseServicesFromUsersList((err, statusCode, userRes) => {
    if (!err) {
      stepsResults.step4TransformUsersDbInResponse = userRes;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, stepsResults.step3GetUsersFromDb, stepsResults.step4TransformUsersDbInResponse);
}
