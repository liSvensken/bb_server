import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetMastersList } from '../interfaces/steps-result-get-masters-list.interface';
import { parseClientIdsStrInResponse } from '../../../common/steps/user/parse-client-ids-str-in-response';

export const step5ParseClientIdsStrInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetMastersList) => void,
                                                 stepsResults: StepsResultGetMastersList) => {
  parseClientIdsStrInResponse((err, statusCode, userRes) => {
    if (!err) {
      stepsResults.step2TransformMastersInResponse = userRes;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, stepsResults.step1GetMastersFromDb, stepsResults.step2TransformMastersInResponse);
}
