import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetClientsList } from '../interfaces/steps-clients-get-users-list.interface';
import { parseCitiesInResponse } from '../../../common/steps/user/parse-cities-in-response';

export const step4ParseCitiesInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetClientsList) => void,
                                             stepsResults: StepsResultGetClientsList) => {
  parseCitiesInResponse((err, statusCode, userRes) => {
    if (!err) {
      stepsResults.step2ParseClientsInResponse = userRes;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, stepsResults.step1GetClientsFromDb, stepsResults.step2ParseClientsInResponse);
}
