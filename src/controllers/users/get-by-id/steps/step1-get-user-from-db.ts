import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { getRowByField } from '../../../common/steps/get-row-by-field';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { UserDbEnum } from '../../../../enums/users-table/user-db.enum';
import { StepsResultGetUser } from '../interfaces/steps-result.interface';

export const step1GetUserFromDb = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUser) => void,
                                   id: number, stepsResults: StepsResultGetUser) => {
  getRowByField((err, statusCode, result) => {
    if (!err) {
      stepsResults.step1GetUserFromDb = result;
      callback(null, 200, stepsResults);
    }
  }, TablesEnum.Users, id, UserDbEnum.Id);
}
