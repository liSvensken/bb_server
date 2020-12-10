import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { getRowsList } from '../../../common/steps/get-rows-list';
import { ServiceModel } from '../../../../models/service/service.model';
import { StepsResultGetServicesList } from '../interfaces/steps-result-get-services-list';
import { isServices } from '../../../../models/service/check-is-models/check-is-services';

export const step1GetServicesFromDb = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetServicesList) => void,
                                       limit: number, offset: number, stepsResults: StepsResultGetServicesList) => {
  getRowsList((err, statusCode, result) => {
    if (!err && isServices(result)) {
      stepsResults.step1GetServicesFromDb = result;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, TablesEnum.Services, limit, offset)
}
