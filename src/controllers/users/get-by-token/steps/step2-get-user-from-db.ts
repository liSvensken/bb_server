import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetUserByToken } from '../interfaces/steps-result-get-user-by-token.interface';
import { isUsersDb } from '../../../../models/user/check-is-models/check-is-users-db';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { UserDbEnum } from '../../../../enums/users/user-db.enum';
import { getRowsByField } from '../../../common/steps/get-rows-by-field';

export const step2GetUserFromDb = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUserByToken) => void,
                                   stepsResults: StepsResultGetUserByToken) => {
  const id = stepsResults.step1GetUserId.id;

  getRowsByField((err, statusCode, result) => {
    if (!err && isUsersDb(result)) {
      if (result) {
        stepsResults.step2GetUserFromDb = result;
        callback(null, 200, stepsResults);
      } else {
        callback(null, 204, null);
      }
    } else {
      callback(err, statusCode, null);
    }
  }, TablesEnum.Users, null, null,{ [UserDbEnum.Id]: id });
}
