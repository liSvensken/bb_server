import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetMastersList } from '../interfaces/steps-result-get-masters-list.interface';
import { parseServicesInResponse } from '../../../common/steps/user/parse-services-in-response';

export const step3ParseServicesInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetMastersList) => void,
                                             stepsResults: StepsResultGetMastersList) => {
  parseServicesInResponse((err, statusCode, userRes) => {
    if (!err) {
      stepsResults.step2ParseMastersInResponse = userRes;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, stepsResults.step1GetMastersFromDb, stepsResults.step2ParseMastersInResponse);
}
