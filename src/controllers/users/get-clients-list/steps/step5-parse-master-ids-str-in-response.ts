import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetClientsList } from '../interfaces/steps-clients-get-users-list.interface';
import { parseMasterIdsStrInResponse } from '../../../common/steps/user/parse-master-ids-str-in-response';

export const step5ParseMasterIdsStrInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetClientsList) => void,
                                                 stepsResults: StepsResultGetClientsList) => {
  parseMasterIdsStrInResponse((err, statusCode, userRes) => {
    if (!err) {
      stepsResults.step2TransformClientsInResponse = userRes;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, stepsResults.step1GetClientsFromDb, stepsResults.step2TransformClientsInResponse);
}
