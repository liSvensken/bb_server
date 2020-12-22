import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { CitiesDbEnum } from '../../../../enums/cities/cities-db.enum';
import { StepsResultGetCity } from '../interfaces/steps-result-get-city';
import { isCity } from '../../../../models/city/check-is-models/check-is-cities';
import { getRowsByField } from '../../../common/steps/get-rows-by-field';

export const step2GetCity = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetCity) => void,
                             id: number, stepsResults: StepsResultGetCity) => {

  getRowsByField((err, statusCode, result) => {
    if (!err && isCity(result)) {
      if (result) {
        stepsResults.step2GetCity = result ? result : null;
        callback(null, 200, stepsResults);
      } else {
        callback(null, 204, null);
      }
    } else {
      callback(err, statusCode, null);
    }
  }, TablesEnum.Cities, null, null, { [CitiesDbEnum.Id]: id });
}
