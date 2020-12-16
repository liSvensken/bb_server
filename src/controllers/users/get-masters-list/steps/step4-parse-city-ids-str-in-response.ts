import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetMastersList } from '../interfaces/steps-result-get-masters-list.interface';
import { parseCityIdsStrInResponse } from '../../../common/steps/user/parse-city-ids-str-in-response';

export const step4ParseCityIdsStrInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetMastersList) => void,
                                               stepsResults: StepsResultGetMastersList) => {
  parseCityIdsStrInResponse((err, statusCode, userRes) => {
    if (!err) {
      stepsResults.step2TransformMastersInResponse = userRes;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, stepsResults.step1GetMastersFromDb, stepsResults.step2TransformMastersInResponse);
}
