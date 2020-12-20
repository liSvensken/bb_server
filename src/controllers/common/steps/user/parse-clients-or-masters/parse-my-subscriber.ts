import { ErrorInterface } from '../../../../../utils/errors/error.interface';
import { getRowsByField } from '../../get-rows-by-field';
import { TablesEnum } from '../../../../../enums/tables-name.enum';
import { UserResponseModel } from '../../../../../models/user/user-response.model';
import { isUsersDb } from '../../../../../models/user/check-is-models/check-is-users-db';
import { UserDbEnum } from '../../../../../enums/users/user-db.enum';
import { parseCityFromUser } from '../parse-city/parse-city-from-user';
import { UserDbModel } from '../../../../../models/user/user-db.model';
import { parseServicesFromUser } from '../parse-services/parse-services-from-user';

export const parseMySubscriber = (callback: (err: ErrorInterface, statusCode: number, userRes: UserResponseModel) => void,
                                  mySubscribeId: number) => {

  getRowsByField((err, statusCode, result) => {
    if (!err && isUsersDb(result)) {
      const userDb: UserDbModel = result[0];
      // создаем поля для myClient / myMaster
      const mySubscriberRes: UserResponseModel = {
        id: userDb.id,
        role: userDb.role,
        nickname: userDb.nickname,
        email: userDb.email,
        lastsName: userDb.lastsName ? userDb.lastsName : null,
        firsName: userDb.firsName ? userDb.firsName : null,
        phone: userDb.phone ? userDb.phone : null,
        gender: userDb.gender ? userDb.gender : null,
        birthday: userDb.birthday ? userDb.birthday : null,
        avatar: userDb.avatar ? userDb.avatar : null,
        infoYourself: userDb.infoYourself ? userDb.infoYourself : null
      }

      const cityId: number = userDb.cityId ? userDb.cityId : null;
      const serviceIds: number[] = userDb.serviceIdsStr ? JSON.parse(userDb.serviceIdsStr) : null;

      // парсим ids[] городов для myClient / myMaster
      parseCityFromUser((err, statusCode, result) => {
        if (!err) {
          mySubscriberRes.city = result;
          parseServicesFromUser((err, statusCode, result) => {
            if (!err) {
              mySubscriberRes.services = result;
              callback(null, 200, mySubscriberRes)
            } else {
              callback(err, statusCode, null);
            }
          }, serviceIds, mySubscriberRes.role); // изменить город парс и сервисы
        } else {
          callback(err, statusCode, null);
        }
      }, cityId)
    }
  }, TablesEnum.Users, mySubscribeId, UserDbEnum.Id)
}
