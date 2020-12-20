import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetUsersList } from '../interfaces/steps-result-get-users-list.interface';
import { transformUsersDbInResponse } from '../../../common/steps/user/transform-users-db-in-response';

export const step4TransformUsersDbInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUsersList) => void,
                                                stepsResults: StepsResultGetUsersList) => {

  const role = stepsResults.step3GetUsersFromDb[0].role;

  transformUsersDbInResponse(usersResponse => {
    stepsResults.step4TransformUsersDbInResponse = usersResponse;
    callback(null, 200, stepsResults);
  }, role, stepsResults.step3GetUsersFromDb);
}
