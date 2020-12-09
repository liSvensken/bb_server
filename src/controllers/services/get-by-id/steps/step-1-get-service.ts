import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { getRowByField } from '../../../common/steps/get-row-by-field';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { ServicesDbEnum } from '../../../../enums/services-table/services-db.enum';
import { StepsResultGetService } from '../interfaces/steps-result-get-service';

export const step1GetService = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetService) => void,
                                id: number, stepsResults: StepsResultGetService) => {
  getRowByField((err, statusCode, result) => {
    if (!err) {
      stepsResults.step1GetService = result;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, TablesEnum.Services, id, ServicesDbEnum.Id);
}
