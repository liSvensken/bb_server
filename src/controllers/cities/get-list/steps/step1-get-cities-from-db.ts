import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { getRowsList } from '../../../common/steps/get-rows-list';
import { ServiceModel } from '../../../../models/service/service.model';
import { StepsResultGetCitiesList } from '../interfaces/steps-result-get-cities-list';

export const step1GetCitiesFromDb = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetCitiesList) => void,
                                     limit: number, offset: number, stepsResults: StepsResultGetCitiesList) => {
  getRowsList((err, statusCode, result) => {
    if (!err) {
      stepsResults.step1GetCitiesFromDb = result;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, TablesEnum.Cities, limit, offset)
}
