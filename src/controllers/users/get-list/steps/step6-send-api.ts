import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { UserResponseModel } from '../../../../models/user/user-response.model';
import { StepsResultGetUsersList } from '../interfaces/steps-result-get-users-list';

export const step6SendApi = (callback: (err: ErrorInterface, statusCode: number, result: UserResponseModel[], totalItems: number) => void,
                             stepsResults: StepsResultGetUsersList) => {
  callback(null, 200, stepsResults.step2ParseUsersInResponse, stepsResults.step5GetTotalItems);
}
