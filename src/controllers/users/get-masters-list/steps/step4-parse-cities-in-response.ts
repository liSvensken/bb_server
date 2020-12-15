import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetMastersList } from '../interfaces/steps-result-get-masters-list.interface';
import { parseCitiesInResponse } from '../../../common/steps/user/parse-cities-in-response';

export const step4ParseCitiesInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetMastersList) => void,
                                             stepsResults: StepsResultGetMastersList) => {
  parseCitiesInResponse((err, statusCode, userRes) => {
    if (!err) {
      stepsResults.step2ParseMastersInResponse = userRes;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, stepsResults.step1GetMastersFromDb, stepsResults.step2ParseMastersInResponse);
}
