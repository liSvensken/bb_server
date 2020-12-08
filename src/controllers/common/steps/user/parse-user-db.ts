import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { UserDbModel } from '../../../../models/user/user-db.model';
import { UserResponseModel } from '../../../../models/user/user-response.model';
import { getRowByField } from '../get-row-by-field';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { UserRequestEnum } from '../../../../enums/users-table/user-request.enum';
import { ServicesDbEnum } from '../../../../enums/services-table/services-db.enum';
import { CitiesDbEnum } from '../../../../enums/cities-table/cities-db.enum';

export const parseUserDb = (callback: (err: ErrorInterface, statusCode: number, result?: UserDbModel[]) => void,
                                          usersDb: UserDbModel[]) => {
  let usersResponse: UserResponseModel[] = [];

  usersDb.forEach((userDb, idx) => {
    const user: UserResponseModel = {
      id: userDb.id,
      role: userDb.role,
      nickname: userDb.nickname,
      email: userDb.email,
      services: [],
      cities: [],
      lastsName: userDb.lastsName,
      firsName: userDb.firsName,
      phone: userDb.phone,
      gender: userDb.gender,
      birthday: userDb.birthday,
      avatar: userDb.avatar,
      infoYourself: userDb.infoYourself
    };

    const serviceIds: number = JSON.parse(userDb.serviceIdsStr);
    const cityIds: number = JSON.parse(userDb.cityIdsStr);

    getRowByField((err, statusCode, result) => {
      if (!err) {
        user.services = result;
        getRowByField((err, statusCode, result) => {
          if (!err) {
            user.cities = result;
            usersResponse.push(user);
            if (idx === usersDb.length - 1) {
              callback(null, 200, usersResponse);
            }
          } else {
            callback(err, statusCode, null);
          }
        }, TablesEnum.Cities, cityIds, CitiesDbEnum.Id);
      } else {
        callback(err, statusCode, null);
      }
    }, TablesEnum.Services, serviceIds, ServicesDbEnum.Id);
  })
}
