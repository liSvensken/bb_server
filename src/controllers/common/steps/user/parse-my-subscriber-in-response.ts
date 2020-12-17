import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { getRowsByField } from '../get-rows-by-field';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { UserResponseModel } from '../../../../models/user/user-response.model';
import { isUsersDb } from '../../../../models/user/check-is-models/check-is-users-db';
import { UserDbEnum } from '../../../../enums/users/user-db.enum';
import { UserRole, UserRoleType } from '../../../../types/user-role.type';
import { parseCityDbInResponse } from './parse-city-db-in-response';
import { parseServicesDbInResponse } from './parse-services-db-in-response';

export const parseMySubscriberInResponse = (callback: (err: ErrorInterface, statusCode: number, userRes: UserResponseModel[]) => void,
                                            role: UserRole, mySubscriberId: number[], subscribersRes: UserResponseModel[]) => {

  getRowsByField((err, statusCode, usersDb) => {
    if (!err && isUsersDb(usersDb)) {
      usersDb.forEach((subscriberDb, idx) => {
        subscribersRes[idx].id = subscriberDb.id;
        subscribersRes[idx].role = subscriberDb.role;
        subscribersRes[idx].nickname = subscriberDb.nickname;
        subscribersRes[idx].email = subscriberDb.email;
        subscribersRes[idx].lastsName = subscriberDb.lastsName ? subscriberDb.lastsName : null;
        subscribersRes[idx].firsName = subscriberDb.firsName ? subscriberDb.firsName : null;
        subscribersRes[idx].phone = subscriberDb.phone ? subscriberDb.phone : null;
        subscribersRes[idx].gender = subscriberDb.gender ? subscriberDb.gender : null;
        subscribersRes[idx].birthday = subscriberDb.birthday ? subscriberDb.birthday : null;
        subscribersRes[idx].avatar = subscriberDb.avatar ? subscriberDb.avatar : null;
        subscribersRes[idx].infoYourself = subscriberDb.infoYourself ? subscriberDb.infoYourself : null;
      })

      parseCityDbInResponse((err, statusCode, userRes) => {
        switch (true) {
          case !!(err):
            callback(err, statusCode, null);
            break;

          case role === UserRoleType.CLIENT:
            callback(null, 200, userRes);
            break;

          case role === UserRoleType.MASTER:
            parseServicesDbInResponse((err, statusCode, userRes) => {
              if (!err) {
                callback(null, 200, userRes)
              } else {
                callback(err, statusCode, null);
              }
            }, usersDb, subscribersRes);
            break;
        }
      }, usersDb, subscribersRes)
    }
  }, TablesEnum.Users, mySubscriberId, UserDbEnum.Id)

  // switch (role) {
  //   case UserRoleType.MASTER:
  //     usersDb.forEach((elem, idx) => {
  //       if (elem.myClientIdsStr) {
  //         const clientIds: number = JSON.parse(elem.myClientIdsStr);
  //         getRowsByField((err, statusCode, result) => {
  //           if (!err && isUsersDb(result)) {
  //             usersRes[idx].myClients = result;
  //             // result.forEach((client, i) => {
  //             //   usersRes[idx].myClients[i].id = client.id;
  //             //   usersRes[idx].myClients[i].nickname = client.nickname;
  //             //   usersRes[idx].myClients[i].lastsName = client.lastsName;
  //             //   usersRes[idx].myClients[i].firsName = client.firsName;
  //             //   usersRes[idx].myClients[i].phone = client.phone;
  //             //   usersRes[idx].myClients[i].gender = client.gender;
  //             //   usersRes[idx].myClients[i].birthday = client.birthday;
  //             //   usersRes[idx].myClients[i].avatar = client.avatar;
  //             //   usersRes[idx].myClients[i].infoYourself = client.infoYourself;
  //             // })
  //             if (idx === usersDb.length - 1) {
  //               callback(null, 200, usersRes); // ОК, Последний шаг, распарсили клиентов
  //             }
  //           } else {
  //             callback(err, statusCode, null); // Ошибка в SQL запросе
  //           }
  //         }, TablesEnum.Users, clientIds, UserDbEnum.Id)
  //       } else if (idx === usersDb.length - 1) {
  //         callback(null, 200, usersRes); // ОК, в последнем шаге клиентов нет, выход
  //       }
  //     })
  //     break;
  //
  //   case UserRoleType.CLIENT:
  //     callback(null, 200, usersRes); // ОК, роль - Клиент, нет поля myClients, выход
  //     break;
  // }
}
