import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { UserResponseModel } from '../../../../models/user/user-response.model';
import { StepsResultGetUser } from '../interfaces/steps-result.interface';


export const step6SendApi = (callback: (err: ErrorInterface, statusCode: number, result?: UserResponseModel[]) => void,
                             stepsResults?: StepsResultGetUser) => {
  callback(null, 200, stepsResults.step2TransformInUserResponse);
}
