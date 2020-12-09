import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { getCountRowsByField } from '../../../common/steps/get-count-rows-by-field';
import { UserDbEnum } from '../../../../enums/users-table/user-db.enum';
import { StepsResultGetUsersList } from '../interfaces/steps-result-get-users-list';

export const step5GetTotalItems = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUsersList) => void,
                                   stepsResults: StepsResultGetUsersList) => {
  getCountRowsByField((err, statusCode, result) => {
    if (!err) {
      stepsResults.step5GetTotalItems = result;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, TablesEnum.Users, UserDbEnum.Id);
}
