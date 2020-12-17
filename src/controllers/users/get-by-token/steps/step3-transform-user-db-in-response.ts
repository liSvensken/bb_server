import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetUserByToken } from '../interfaces/steps-result-get-user-by-token.interface';
import { transformUsersDbInResponse } from '../../../common/steps/user/transform-users-db-in-response';


export const step3TransformUserDbInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUserByToken) => void,
                                               stepsResults: StepsResultGetUserByToken) => {

  transformUsersDbInResponse(usersResponse => {
    stepsResults.step3TransformUserDbInResponse = usersResponse;
    callback(null, 200, stepsResults);
  }, stepsResults.step2GetUserFromDb);
}
