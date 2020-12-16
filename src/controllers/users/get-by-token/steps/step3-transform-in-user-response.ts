import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetUserByToken } from '../interfaces/steps-result-get-user-by-token.interface';
import { transformUsersInResponse } from '../../../common/steps/user/transform-users-in-response';


export const step3TransformInUserResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUserByToken) => void,
                                             stepsResults: StepsResultGetUserByToken) => {

  transformUsersInResponse(usersResponse => {
    stepsResults.step3TransformInUserResponse = usersResponse;
    callback(null, 200, stepsResults);
  }, stepsResults.step2GetUserFromDb);
}
