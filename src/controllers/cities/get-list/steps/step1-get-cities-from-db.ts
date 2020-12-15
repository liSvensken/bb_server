import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { getRowsLimit } from '../../../common/steps/get-rows-limit';
import { ServiceModel } from '../../../../models/service/service.model';
import { StepsResultGetCitiesList } from '../interfaces/steps-result-get-cities-list';
import { isCities } from '../../../../models/city/check-is-models/check-is-cities';

export const step1GetCitiesFromDb = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetCitiesList) => void,
                                     limit: number, offset: number, stepsResults: StepsResultGetCitiesList) => {
  getRowsLimit((err, statusCode, result) => {
    if (!err && isCities(result)) {
      stepsResults.step1GetCitiesFromDb = result;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, TablesEnum.Cities, limit, offset)
}
