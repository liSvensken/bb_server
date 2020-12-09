import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetUsersList } from '../interfaces/steps-result-get-users-list';
import { parseUsersInResponse } from '../../../common/steps/user/parse-users-in-response';

export const step2ParseUsersInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUsersList) => void,
                                          stepsResults: StepsResultGetUsersList) => {
  parseUsersInResponse(usersResponse => {
    stepsResults.step2ParseUsersInResponse = usersResponse;
    callback(null, 200, stepsResults);
  }, stepsResults.step1GetUsersFromDb);
}
