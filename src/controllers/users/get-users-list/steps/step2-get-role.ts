import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { getRowsByField } from '../../../common/steps/get-rows-by-field';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { UserDbEnum } from '../../../../enums/users/user-db.enum';
import { isUsersDb } from '../../../../models/user/check-is-models/check-is-users-db';
import { StepsResultGetUsersList } from '../interfaces/steps-result-get-users-list.interface';

export const step2GetRole = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUsersList) => void,
                             stepsResults: StepsResultGetUsersList) => {
  let error: ErrorInterface = {
    type: '',
    field: '',
    message: '',
    status: 0,
  };

  const id = stepsResults.step1GetUserIdByToken;
  getRowsByField((err, statusCode, result) => {
    if (!err && isUsersDb(result)) {
      stepsResults.step2GetRole = result[0].role;
    } else {
      callback(err, statusCode, null);
    }
  }, TablesEnum.Users, id, UserDbEnum.Id)
}
