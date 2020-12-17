import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultAuthorization } from '../interfaces/steps-result-authorization.interface';
import { UserAuthorizationResponse } from '../interfaces/user-authorization-response.interface';

export const step9SendApi = (callback: (err: ErrorInterface, statusCode: number, result: UserAuthorizationResponse, totalItems: number, token: string) => void,
                             stepsResults: StepsResultAuthorization) => {
  callback(null, 200, stepsResults.step4TransformUserDbInResponse[0], null, stepsResults.step3CreateToken);
}
