import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { transformUsersInResponse } from '../../../common/steps/user/transform-users-in-response';
import { StepsResultGetUser } from '../interfaces/steps-result.interface';

export const step4TransformInUserResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUser) => void,
                                             stepsResults: StepsResultGetUser) => {
  transformUsersInResponse(usersResponse => {
    stepsResults.step3TransformInUserResponse = usersResponse;
    callback(null, 200, stepsResults);
  }, stepsResults.step2GetUserFromDb);
}
