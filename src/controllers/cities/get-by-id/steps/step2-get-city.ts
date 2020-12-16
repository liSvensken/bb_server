import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { ServiceModel } from '../../../../models/service/service.model';
import { getRowsByField } from '../../../common/steps/get-rows-by-field';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { ServicesDbEnum } from '../../../../enums/services/services-db.enum';
import { CitiesDbEnum } from '../../../../enums/cities/cities-db.enum';
import { StepsResultGetCity } from '../interfaces/steps-result-get-city';
import { isCities } from '../../../../models/city/check-is-models/check-is-cities';

export const step2GetCity = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetCity) => void,
                             id: number, stepsResults: StepsResultGetCity) => {
  getRowsByField((err, statusCode, result) => {
    if (!err && isCities(result)) {
      if (result) {
        stepsResults.step2GetCity = result ? result[0] : null;
        callback(null, 200, stepsResults);
      } else {
        callback(null, 204, null);
      }
    } else {
      callback(err, statusCode, null);
    }
  }, TablesEnum.Cities, id, CitiesDbEnum.Id);
}
