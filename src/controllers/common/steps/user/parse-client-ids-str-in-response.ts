import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { getRowsByField } from '../get-rows-by-field';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { UserDbModel } from '../../../../models/user/user-db.model';
import { UserResponseModel } from '../../../../models/user/user-response.model';
import { isUsersDb } from '../../../../models/user/check-is-models/check-is-users-db';
import { UserDbEnum } from '../../../../enums/users/user-db.enum';

export const parseClientIdsStrInResponse = (callback: (err: ErrorInterface, statusCode: number, userRes: UserResponseModel[]) => void,
                                            usersDb: UserDbModel[], usersRes: UserResponseModel[]) => {

  usersDb.forEach((elem, idx) => {
    switch (true) {
      case !!(elem.myClientIdsStr):
        const clientIds: number = JSON.parse(elem.myClientIdsStr);
        getRowsByField((err, statusCode, result) => {
          if (!err && isUsersDb(result)) {
            usersRes[idx].myClients = result;
            if (idx === usersDb.length - 1) {
              callback(null, 200, usersRes);
            }
          } else {
            callback(err, statusCode, null);
          }
        }, TablesEnum.Users, clientIds, UserDbEnum.Id)
        break;

      default:
        if (idx === usersDb.length - 1) {
          callback(null, 200, usersRes);
        }
    }
  })
}
