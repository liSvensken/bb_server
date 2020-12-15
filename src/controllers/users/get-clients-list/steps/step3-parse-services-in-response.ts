import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetClientsList } from '../interfaces/steps-clients-get-users-list.interface';
import { parseServicesInResponse } from '../../../common/steps/user/parse-services-in-response';

export const step3ParseServicesInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetClientsList) => void,
                                             stepsResults: StepsResultGetClientsList) => {
  parseServicesInResponse((err, statusCode, userRes) => {
    if (!err) {
      stepsResults.step2ParseClientsInResponse = userRes;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, stepsResults.step1GetClientsFromDb, stepsResults.step2ParseClientsInResponse);
}
