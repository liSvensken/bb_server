import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetMastersList } from '../interfaces/steps-result-get-masters-list.interface';
import { transformUsersInResponse } from '../../../common/steps/user/transform-users-in-response';

export const step2TransformMastersInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetMastersList) => void,
                                                stepsResults: StepsResultGetMastersList) => {
  transformUsersInResponse(usersResponse => {
    stepsResults.step2TransformMastersInResponse = usersResponse;
    callback(null, 200, stepsResults);
  }, stepsResults.step1GetMastersFromDb);
}
