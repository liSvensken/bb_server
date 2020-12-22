import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetUsersList } from '../interfaces/steps-result-get-users-list.interface';
import { GetUsersListResponse } from '../interfaces/get-users-list-response.interface';

export const step8SendApi = (callback: (err: ErrorInterface, statusCode: number, result: GetUsersListResponse, totalItems: number) => void,
                             stepsResults: StepsResultGetUsersList) => {

  callback(null, 200, stepsResults.step4TransformUsersDbInResponse, stepsResults.step7GetTotalItems);
}
