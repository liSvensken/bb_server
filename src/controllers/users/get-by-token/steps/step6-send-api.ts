import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetUserByToken } from '../interfaces/steps-result-get-user-by-token.interface';
import { UserResponseModel } from '../../../../models/user/user-response.model';

export const step6SendApi = (callback: (err: ErrorInterface, statusCode: number, result?: UserResponseModel[]) => void,
                             stepsResults?: StepsResultGetUserByToken) => {
  callback(null, 200, stepsResults.step3TransformInUserResponse);
}
