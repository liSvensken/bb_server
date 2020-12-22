import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetUser } from '../interfaces/steps-result.interface';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { UserDbEnum } from '../../../../enums/users/user-db.enum';
import { isUsersDb } from '../../../../models/user/check-is-models/check-is-users-db';
import { UserRoleType } from '../../../../types/user-role.type';
import { ErrorTypes } from '../../../../utils/errors/error.types';
import { getRowsByField } from '../../../common/steps/get-rows-by-field';

export const step3CheckRole = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUser) => void,
                               stepsResults: StepsResultGetUser) => {
  let error: ErrorInterface = {
    type: '',
    field: '',
    message: '',
    status: 0,
  };

  const id = stepsResults.step1GetUserIdByToken;
  getRowsByField((err, statusCode, result) => {
    if (!err && isUsersDb(result)) {
      switch (true) {
        case result[0].role === UserRoleType.MASTER &&
        stepsResults.step2GetUserFromDb[0].role === UserRoleType.CLIENT:
          callback(null, statusCode, stepsResults)
          break;

        default:
          error.type = ErrorTypes.Forbidden;
          error.message = 'No access';
          error.status = 403;
          callback(error, error.status, null);
      }
    } else {
      callback(err, statusCode, null);
    }
  }, TablesEnum.Users, null, null,{ [UserDbEnum.Id]: id })
}
