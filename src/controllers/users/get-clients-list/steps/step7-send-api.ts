import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { UserResponseModel } from '../../../../models/user/user-response.model';
import { StepsResultGetClientsList } from '../interfaces/steps-clients-get-users-list.interface';

export const step7SendApi = (callback: (err: ErrorInterface, statusCode: number, result: UserResponseModel[], totalItems: number) => void,
                             stepsResults: StepsResultGetClientsList) => {
  callback(null, 200, stepsResults.step2TransformClientsInResponse, stepsResults.step5GetTotalItems);
}
