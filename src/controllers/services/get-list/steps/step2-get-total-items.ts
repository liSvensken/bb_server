import { getCountRowsByField } from '../../../common/steps/get-count-rows-by-field';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { ServicesDbEnum } from '../../../../enums/services-table/services-db.enum';
import { StepsResultGetServicesList } from '../interfaces/steps-result-get-services-list';

export const step2GetTotalItems = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetServicesList) => void,
                                   stepsResults: StepsResultGetServicesList) => {
  getCountRowsByField((err, statusCode, result) => {
    if (!err) {
      stepsResults.step2GetTotalItems = result;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, TablesEnum.Services, ServicesDbEnum.Id);
}
