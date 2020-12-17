import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { getRowsByField } from '../get-rows-by-field';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { UserDbModel } from '../../../../models/user/user-db.model';
import { UserResponseModel } from '../../../../models/user/user-response.model';
import { isUsersDb } from '../../../../models/user/check-is-models/check-is-users-db';
import { UserDbEnum } from '../../../../enums/users/user-db.enum';
import { UserRole, UserRoleType } from '../../../../types/user-role.type';

export const parseMyMastersDbInResponse = (callback: (err: ErrorInterface, statusCode: number, userRes: UserResponseModel[]) => void,
                                           role: UserRole, usersDb: UserDbModel[], usersRes: UserResponseModel[]) => {

  switch (role) {
    case UserRoleType.CLIENT:
      usersDb.forEach((elem, idx) => {
        if (elem.myMasterIdsStr) {
          const masterIds: number = JSON.parse(elem.myMasterIdsStr);
          getRowsByField((err, statusCode, result) => {
            if (!err && isUsersDb(result)) {
              usersRes[idx].myMasters = result;
              if (idx === usersDb.length - 1) {
                callback(null, 200, usersRes); // ОК, Последний шаг, распарсили мастеров
              }
            } else {
              callback(err, statusCode, null); // Ошибка в SQL запросе
            }
          }, TablesEnum.Users, masterIds, UserDbEnum.Id)
        } else if (idx === usersDb.length - 1){
          callback(null, 200, usersRes); // ОК, в последнем шаге мастеров нет, выход
        }
      })
      break;

    case UserRoleType.MASTER:
      callback(null, 200, usersRes); // ОК, роль - Мастер, нет поля myMasters, выход
      break;
  }
}
