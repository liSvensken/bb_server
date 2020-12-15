import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { UserResponseModel } from '../../../../models/user/user-response.model';
import { StepsResultGetMastersList } from '../interfaces/steps-result-get-masters-list.interface';

export const step6SendApi = (callback: (err: ErrorInterface, statusCode: number, result: UserResponseModel[], totalItems: number) => void,
                             stepsResults: StepsResultGetMastersList) => {
  callback(null, 200, stepsResults.step2ParseMastersInResponse, stepsResults.step5GetTotalItems);
}
