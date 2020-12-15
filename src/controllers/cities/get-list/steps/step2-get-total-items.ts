import { countRows } from '../../../common/steps/count-rows';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { ServicesDbEnum } from '../../../../enums/services/services-db.enum';
import { StepsResultGetCitiesList } from '../interfaces/steps-result-get-cities-list';

export const step2GetTotalItems = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetCitiesList) => void,
                                   stepsResults: StepsResultGetCitiesList) => {
  countRows((err, statusCode, result) => {
    if (!err) {
      stepsResults.step2GetTotalItems = result;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, TablesEnum.Cities, ServicesDbEnum.Id);
}
