import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetUsersList } from '../interfaces/steps-result-get-users-list.interface';
import { parseMySubscriberInResponse } from '../../../common/steps/user/parse-my-subscriber-in-response';
import { UserRole, UserRoleType } from '../../../../types/user-role.type';

export const step7ParseMyClientsDbInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUsersList) => void,
                                                role: UserRole, stepsResults: StepsResultGetUsersList) => {
  parseMySubscriberInResponse((err, statusCode, userRes) => {
    if (!err) {
      stepsResults.step4TransformUsersDbInResponse = userRes;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, role, stepsResults.step3GetUsersFromDb, stepsResults.step4TransformUsersDbInResponse);
}
