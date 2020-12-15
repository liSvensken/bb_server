import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { StepsResultGetMastersList } from '../interfaces/steps-result-get-masters-list.interface';
import { isUsersDb } from '../../../../models/user/check-is-models/check-is-users-db';
import { getRowsByFieldLimit } from '../../../common/steps/get-rows-by-field-limit';
import { UserRoleType } from '../../../../types/user-role.type';
import { UserDbEnum } from '../../../../enums/users/user-db.enum';

export const step1GetMastersFromDb = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetMastersList) => void,
                                      limit: number, offset: number, stepsResults: StepsResultGetMastersList) => {
  getRowsByFieldLimit((err, statusCode, result) => {
    if (!err && isUsersDb(result)) {
      stepsResults.step1GetMastersFromDb = result;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, TablesEnum.Users, UserRoleType.MASTER, UserDbEnum.Role, limit, offset);
}
