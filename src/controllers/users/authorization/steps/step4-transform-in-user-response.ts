import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { transformUsersInResponse } from '../../../common/steps/user/transform-users-in-response';
import { StepsResultAuthorization } from '../interfaces/steps-result-authorization.interface';

export const step4TransformInUserResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultAuthorization) => void,
                                             stepsResults: StepsResultAuthorization) => {
  transformUsersInResponse(usersResponse => {
    stepsResults.step4TransformInUserResponse = usersResponse;
    callback(null, 200, stepsResults);
  }, stepsResults.step1GetUserFromDb);
}
