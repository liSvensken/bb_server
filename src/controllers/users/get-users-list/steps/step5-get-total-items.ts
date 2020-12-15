import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { countRows } from '../../../common/steps/count-rows';
import { UserDbEnum } from '../../../../enums/users/user-db.enum';
import { StepsResultGetUsersList } from '../interfaces/steps-result-get-users-list.interface';

export const step5GetTotalItems = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUsersList) => void,
                                   stepsResults: StepsResultGetUsersList) => {
  countRows((err, statusCode, result) => {
    if (!err) {
      stepsResults.step5GetTotalItems = result;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, TablesEnum.Users, UserDbEnum.Id);
}
