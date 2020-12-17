import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetUser } from '../interfaces/steps-result.interface';
import { GetUserByIdResponse } from '../interfaces/get-user-response.interface';


export const step9SendApi = (callback: (err: ErrorInterface, statusCode: number, result?: GetUserByIdResponse) => void,
                             stepsResults?: StepsResultGetUser) => {
  callback(null, 200, stepsResults.step4TransformUserDbInResponse[0]);
}
