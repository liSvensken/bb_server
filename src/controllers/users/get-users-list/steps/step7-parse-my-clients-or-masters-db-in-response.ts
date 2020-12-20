import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetUsersList } from '../interfaces/steps-result-get-users-list.interface';
import { parseMySubscriber } from '../../../common/steps/user/parse-clients-or-masters/parse-my-subscriber';
import { UserRole, UserRoleType } from '../../../../types/user-role.type';
import { getSubscribersListFromUsersList } from '../../../common/steps/user/parse-clients-or-masters/get-subscribers-list-from-users-list';

export const step7ParseMyClientsOrMastersDbInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUsersList) => void,
                                                         stepsResults: StepsResultGetUsersList) => {

  const role: UserRole = stepsResults.step2GetCurrentUserRole;

  getSubscribersListFromUsersList((err, statusCode, userRes) => {
    if (!err) {
      stepsResults.step4TransformUsersDbInResponse = userRes;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, role, stepsResults.step3GetUsersFromDb, stepsResults.step4TransformUsersDbInResponse);
}
