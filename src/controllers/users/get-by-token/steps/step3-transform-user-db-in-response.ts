import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetUserByToken } from '../interfaces/steps-result-get-user-by-token.interface';
import { transformUsersDbInResponse } from '../../../common/steps/user/transform-users-db-in-response';


export const step3TransformUserDbInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUserByToken) => void,
                                               stepsResults: StepsResultGetUserByToken) => {

  const role = stepsResults.step2GetUserFromDb[0].role;

  transformUsersDbInResponse(usersResponse => {
    stepsResults.step3TransformUserDbInResponse = usersResponse;
    callback(null, 200, stepsResults);
  }, role, stepsResults.step2GetUserFromDb);
}
