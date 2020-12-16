import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetUserByToken } from '../interfaces/steps-result-get-user-by-token.interface';
import { GetUserByTokenResponse } from '../interfaces/get-user-by-token-response.interface';

export const step6SendApi = (callback: (err: ErrorInterface, statusCode: number, result?: GetUserByTokenResponse) => void,
                             stepsResults?: StepsResultGetUserByToken) => {
  callback(null, 200, stepsResults.step3TransformInUserResponse[0]);
}
