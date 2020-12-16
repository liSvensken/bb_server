import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetClientsList } from '../interfaces/steps-clients-get-users-list.interface';
import { parseServiceIdsStrInResponse } from '../../../common/steps/user/parse-service-ids-str-in-response';

export const step3ParseServiceIdsStrInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetClientsList) => void,
                                                  stepsResults: StepsResultGetClientsList) => {
  parseServiceIdsStrInResponse((err, statusCode, userRes) => {
    if (!err) {
      stepsResults.step2TransformClientsInResponse = userRes;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, stepsResults.step1GetClientsFromDb, stepsResults.step2TransformClientsInResponse);
}
