import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { UserDbEnum } from '../../../../enums/users/user-db.enum';
import { isUsersDb } from '../../../../models/user/check-is-models/check-is-users-db';
import { StepsResultGetUsersList } from '../interfaces/steps-result-get-users-list.interface';
import { getRowsByField } from '../../../common/steps/get-rows-by-field';

export const step2GetCurrentUserFromDb = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUsersList) => void,
                                          stepsResults: StepsResultGetUsersList) => {

  const id = stepsResults.step1GetUserIdByToken;
  getRowsByField((err, statusCode, result) => {
    if (!err && isUsersDb(result)) {
      stepsResults.step2GetCurrentUserFromDb = result[0];
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, TablesEnum.Users, null, null,{ [UserDbEnum.Id]: id })
}
