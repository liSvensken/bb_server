import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { getRowsByField } from '../get-rows-by-field';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { UserDbModel } from '../../../../models/user/user-db.model';
import { UserResponseModel } from '../../../../models/user/user-response.model';
import { isUsersDb } from '../../../../models/user/check-is-models/check-is-users-db';
import { UserDbEnum } from '../../../../enums/users/user-db.enum';

export const parseMasterIdsStrInResponse = (callback: (err: ErrorInterface, statusCode: number, userRes: UserResponseModel[]) => void,
                                            usersDb: UserDbModel[], usersRes: UserResponseModel[]) => {

  usersDb.forEach((elem, idx) => {
    switch (true) {
      case !!(elem.myMasterIdsStr):
        const masterIds: number = JSON.parse(elem.myMasterIdsStr);
        getRowsByField((err, statusCode, result) => {
          if (!err && isUsersDb(result)) {
            usersRes[idx].myMasters = result;
            if (idx === usersDb.length - 1) {
              callback(null, 200, usersRes);
            }
          } else {
            callback(err, statusCode, null);
          }
        }, TablesEnum.Users, masterIds, UserDbEnum.Id)
        break;

      default:
        if (idx === usersDb.length - 1) {
          callback(null, 200, usersRes);
        }
    }
  })
}
