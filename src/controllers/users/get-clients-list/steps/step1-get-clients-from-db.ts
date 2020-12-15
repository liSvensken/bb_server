import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { StepsResultGetClientsList } from '../interfaces/steps-clients-get-users-list.interface';
import { isUsersDb } from '../../../../models/user/check-is-models/check-is-users-db';
import { getRowsByFieldLimit } from '../../../common/steps/get-rows-by-field-limit';
import { UserRoleType } from '../../../../types/user-role.type';
import { UserDbEnum } from '../../../../enums/users/user-db.enum';

export const step1GetClientsFromDb = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetClientsList) => void,
                                      limit: number, offset: number, stepsResults: StepsResultGetClientsList) => {
  getRowsByFieldLimit((err, statusCode, result) => {
    if (!err && isUsersDb(result)) {
      stepsResults.step1GetClientsFromDb = result;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, TablesEnum.Users, UserRoleType.CLIENT, UserDbEnum.Role, limit, offset);
}
