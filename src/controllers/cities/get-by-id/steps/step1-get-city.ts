import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { ServiceModel } from '../../../../models/service/service.model';
import { getRowByField } from '../../../common/steps/get-row-by-field';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { ServicesDbEnum } from '../../../../enums/services-table/services-db.enum';
import { CitiesDbEnum } from '../../../../enums/cities-table/cities-db.enum';
import { StepsResultGetCity } from '../interfaces/steps-result-get-city';

export const step1GetCity = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetCity) => void,
                             id: number, stepsResults: StepsResultGetCity) => {
  getRowByField((err, statusCode, result) => {
    if (!err) {
      stepsResults.step1GetCity = result;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, TablesEnum.Cities, id, CitiesDbEnum.Id);
}
