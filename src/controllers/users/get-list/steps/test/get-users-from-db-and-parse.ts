import { ErrorInterface } from '../../../../../utils/errors/error.interface';
import { UserDbModel } from '../../../../../models/user/user-db.model';
import { getRowsListFromTable } from '../../../../common/steps/get-rows-list-from-table';
import { TablesEnum } from '../../../../../enums/tables-name.enum';
import { UserRequestModel } from '../../../../../models/user/user-request.model';
import { getItemsTableByIds } from '../../../../common/steps/get-items-table-by-ids';
import { UserResponseModel } from '../../../../../models/user/user-response.model';
import { UserRequestEnum } from '../../../../../enums/user-request.enum';

export const getUsersFromDbAndParse = (callback: (err: ErrorInterface, statusCode: number, result?: UserResponseModel[]) => void,
                                       limit: number, offset: number) => {
  getRowsListFromTable((err, statusCode, result) => {
    if (!err) {
      let userResponse: UserResponseModel[] = [];

      result.forEach((userDb, index) => {
        const serviceIds = JSON.parse(userDb.serviceIdsStr);
        const cityIds = JSON.parse(userDb.cityIdsStr);

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

        getItemsTableByIds((err, statusCode, result) => {
          if (!err) {
            console.log(1)
            user.services = result;
            getItemsTableByIds((err, statusCode, result) => {
              console.log(2)
              if (!err) {
                user.cities = result;
                userResponse.push(user);
                callback(null, 200, userResponse);
              } else {
                callback(err, statusCode, null);
              }
            }, TablesEnum.Cities, cityIds, UserRequestEnum.CityIds);
          } else {
            callback(err, statusCode, null);
          }
        }, TablesEnum.Services, serviceIds, UserRequestEnum.ServiceIds);
      })
    } else {
      callback(err, statusCode, result);
    }
  }, TablesEnum.Users, limit, offset);
}
