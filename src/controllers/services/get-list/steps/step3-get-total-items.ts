import { countRows } from '../../../common/steps/count-rows';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { ServicesDbEnum } from '../../../../enums/services/services-db.enum';
import { StepsResultGetServicesList } from '../interfaces/steps-result-get-services-list';

export const step3GetTotalItems = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetServicesList) => void,
                                   stepsResults: StepsResultGetServicesList) => {
  countRows((err, statusCode, result) => {
    if (!err) {
      stepsResults.step3GetTotalItems = result;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, TablesEnum.Services, ServicesDbEnum.Id);
}
