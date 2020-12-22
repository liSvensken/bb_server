import { countRows } from '../../../common/steps/count-rows';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { ServicesDbEnum } from '../../../../enums/services/services-db.enum';
import { StepsResultGetUsersList } from '../interfaces/steps-result-get-users-list.interface';

export const step7GetTotalItems = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUsersList) => void,
                                   stepsResults: StepsResultGetUsersList) => {
  countRows((err, statusCode, result) => {
    if (!err) {
      stepsResults.step7GetTotalItems = result;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, TablesEnum.Users, ServicesDbEnum.Id);
}
