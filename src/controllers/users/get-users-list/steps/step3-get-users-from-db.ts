import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { StepsResultGetUsersList } from '../interfaces/steps-result-get-users-list.interface';
import { isUsersDb } from '../../../../models/user/check-is-models/check-is-users-db';
import { getRowsByFieldLimit } from '../../../common/steps/get-rows-by-field-limit';
import { UserDbEnum } from '../../../../enums/users/user-db.enum';
import { UserRole, UserRoleType } from '../../../../types/user-role.type';

export const step3GetUsersFromDb = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUsersList) => void,
                                    limit: number, offset: number, stepsResults: StepsResultGetUsersList) => {
  let roleGetUsers: UserRole;
  if (stepsResults.step2GetCurrentUserRole === UserRoleType.MASTER) {
    roleGetUsers = UserRoleType.CLIENT;
  } else {
    roleGetUsers = UserRoleType.MASTER;
  }

  getRowsByFieldLimit((err, statusCode, result) => {
    if (!err && isUsersDb(result)) {
      if (result) {
        stepsResults.step3GetUsersFromDb = result
        callback(null, 200, stepsResults);
      } else {
        callback(null, 204, null);
      }
    } else {
      callback(err, statusCode, null);
    }
  }, TablesEnum.Users, roleGetUsers, UserDbEnum.Role, limit, offset);
}
