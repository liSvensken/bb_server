import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetUserByToken } from '../interfaces/steps-result-get-user-by-token.interface';
import { parseUsersInResponse } from '../../../common/steps/user/parse-users-in-response';


export const step3ParseInUserResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUserByToken) => void,
                                         stepsResults: StepsResultGetUserByToken) => {

  parseUsersInResponse(usersResponse => {
    stepsResults.step3ParseInUserResponse = usersResponse;
    callback(null, 200, stepsResults);
  }, stepsResults.step2GetUserFromDb);
}
