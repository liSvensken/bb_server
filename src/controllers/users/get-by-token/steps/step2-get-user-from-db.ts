import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetUserByToken } from '../interfaces/steps-result-get-user-by-token.interface';
import { getRowByField } from '../../../common/steps/get-row-by-field';
import { isUsersDb } from '../../../../models/user/check-is-models/check-is-users-db';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { UserDbEnum } from '../../../../enums/users/user-db.enum';

export const step2GetUserFromDb = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUserByToken) => void,
                                   stepsResults: StepsResultGetUserByToken) => {
  const id = stepsResults.step1GetUserId.id;

  getRowByField((err, statusCode, result) => {
    if (!err && isUsersDb(result)) {
      stepsResults.step2GetUserFromDb = result;
      callback(null, 200, stepsResults);
    }
  }, TablesEnum.Users, id, UserDbEnum.Id);
}
