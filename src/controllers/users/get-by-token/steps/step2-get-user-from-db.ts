import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetUserByToken } from '../interfaces/steps-result-get-user-by-token.interface';
import { getRowsByField } from '../../../common/steps/get-rows-by-field';
import { isUsersDb } from '../../../../models/user/check-is-models/check-is-users-db';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { UserDbEnum } from '../../../../enums/users/user-db.enum';

export const step2GetUserFromDb = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUserByToken) => void,
                                   stepsResults: StepsResultGetUserByToken) => {
  const id = stepsResults.step1GetUserId.id;

  getRowsByField((err, statusCode, result) => {
    if (!err && isUsersDb(result)) {
      stepsResults.step2GetUserFromDb = result;
      callback(null, 200, stepsResults);
    }
  }, TablesEnum.Users, id, UserDbEnum.Id);
}
