import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { UserDbEnum } from '../../../../enums/users-table/user-db.enum';
import { deleteRowByField } from '../../../common/steps/delete-row-by-field';
import { StepsResultsDeleteUser } from '../interfaces/steps-results-delete-user.interface';

export const step1DeleteUser = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultsDeleteUser) => void,
                             id: string, stepsResults: StepsResultsDeleteUser) => {
  deleteRowByField((err, statusCode, result) =>  {
    if (!err) {
      stepsResults.step1DeleteUser = result;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, TablesEnum.Users, JSON.parse(id), UserDbEnum.Id);
}
