import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetClientsList } from '../interfaces/steps-clients-get-users-list.interface';
import { parseUsersInResponse } from '../../../common/steps/user/parse-users-in-response';

export const step2ParseClientsInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetClientsList) => void,
                                            stepsResults: StepsResultGetClientsList) => {
  parseUsersInResponse(usersResponse => {
    stepsResults.step2ParseClientsInResponse = usersResponse;
    callback(null, 200, stepsResults);
  }, stepsResults.step1GetClientsFromDb);
}
