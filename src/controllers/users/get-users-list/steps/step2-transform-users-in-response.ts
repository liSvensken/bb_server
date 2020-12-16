import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetUsersList } from '../interfaces/steps-result-get-users-list.interface';
import { transformUsersInResponse } from '../../../common/steps/user/transform-users-in-response';

export const step2TransformUsersInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUsersList) => void,
                                              stepsResults: StepsResultGetUsersList) => {
  transformUsersInResponse(usersResponse => {
    stepsResults.step2TransformUsersInResponse = usersResponse;
    callback(null, 200, stepsResults);
  }, stepsResults.step1GetUsersFromDb);
}
