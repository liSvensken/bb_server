import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { transformUsersDbInResponse } from '../../../common/steps/user/transform-users-db-in-response';
import { StepsResultAuthorization } from '../interfaces/steps-result-authorization.interface';

export const step4TransformUserDbInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultAuthorization) => void,
                                               stepsResults: StepsResultAuthorization) => {
  const role = stepsResults.step1GetUserFromDb[0].role;

  transformUsersDbInResponse(usersResponse => {
    stepsResults.step4TransformUserDbInResponse = usersResponse;
    callback(null, 200, stepsResults);
  }, role, stepsResults.step1GetUserFromDb);
}
