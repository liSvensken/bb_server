import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { getRowsByField } from '../../../common/steps/get-rows-by-field';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { UserDbEnum } from '../../../../enums/users/user-db.enum';
import { StepsResultGetUser } from '../interfaces/steps-result.interface';
import { isUsersDb } from '../../../../models/user/check-is-models/check-is-users-db';

export const step1GetUserFromDb = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUser) => void,
                                   id: number, stepsResults: StepsResultGetUser) => {
  getRowsByField((err, statusCode, result) => {
    if (!err && isUsersDb(result)) {
      stepsResults.step1GetUserFromDb = result;
      callback(null, 200, stepsResults);
    }
  }, TablesEnum.Users, id, UserDbEnum.Id);
}
