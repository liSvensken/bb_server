import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { UserResponseModel } from '../../../../models/user/user-response.model';
import { StepsResultGetUsersList } from '../interfaces/steps-result-get-users-list.interface';

export const step8SendApi = (callback: (err: ErrorInterface, statusCode: number, result: UserResponseModel[], totalItems: number) => void,
                             stepsResults: StepsResultGetUsersList) => {
  callback(null, 200, stepsResults.step2TransformUsersInResponse, stepsResults.step6GetTotalItems);
}
