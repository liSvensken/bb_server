import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultUpdateUser } from '../interfaces/steps-result-update-user.interface';
import { UpdateUserResponse } from '../interfaces/update-user-response.interface';

export const step7SendApi = (callback: (err: ErrorInterface, statusCode: number, result: UpdateUserResponse) => void,
                             stepsResults?: StepsResultUpdateUser) => {
  callback(null, 200, stepsResults.step6UpdateUser);
}
