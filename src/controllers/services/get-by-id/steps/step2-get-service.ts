import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { getRowsByField } from '../../../common/steps/get-rows-by-field';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { ServicesDbEnum } from '../../../../enums/services/services-db.enum';
import { StepsResultGetService } from '../interfaces/steps-result-get-service';
import { isServices } from '../../../../models/service/check-is-models/check-is-services';

export const step2GetService = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetService) => void,
                                id: number, stepsResults: StepsResultGetService) => {
  getRowsByField((err, statusCode, result) => {
    if (!err && isServices(result)) {
      if (result) {
        stepsResults.step2GetService = result[0];
        callback(null, 200, stepsResults);
      } else {
        callback(null, 204, null);
      }
    } else {
      callback(err, statusCode, null);
    }
  }, TablesEnum.Services, id, ServicesDbEnum.Id);
}
