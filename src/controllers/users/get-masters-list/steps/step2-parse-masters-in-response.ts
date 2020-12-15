import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetMastersList } from '../interfaces/steps-result-get-masters-list.interface';
import { parseUsersInResponse } from '../../../common/steps/user/parse-users-in-response';

export const step2ParseMastersInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetMastersList) => void,
                                            stepsResults: StepsResultGetMastersList) => {
  parseUsersInResponse(usersResponse => {
    stepsResults.step2ParseMastersInResponse = usersResponse;
    callback(null, 200, stepsResults);
  }, stepsResults.step1GetMastersFromDb);
}
