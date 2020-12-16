import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetClientsList } from '../interfaces/steps-clients-get-users-list.interface';
import { transformUsersInResponse } from '../../../common/steps/user/transform-users-in-response';

export const step2TransformClientsInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetClientsList) => void,
                                                stepsResults: StepsResultGetClientsList) => {
  transformUsersInResponse(usersResponse => {
    stepsResults.step2TransformClientsInResponse = usersResponse;
    callback(null, 200, stepsResults);
  }, stepsResults.step1GetClientsFromDb);
}
