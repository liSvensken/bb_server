import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { parseUsersInResponse } from '../../../common/steps/user/parse-users-in-response';
import { StepsResultGetUser } from '../interfaces/steps-result.interface';

export const step2ParseInUserResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUser) => void,
                                         stepsResults: StepsResultGetUser) => {
  parseUsersInResponse(usersResponse => {
    stepsResults.step2ParseInUserResponse = usersResponse;
    callback(null, 200, stepsResults);
  }, stepsResults.step1GetUserFromDb);
}
