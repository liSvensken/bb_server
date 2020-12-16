import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { UserDbModel } from '../../../../models/user/user-db.model';
import { UserResponseModel } from '../../../../models/user/user-response.model';
import { getRowsByField } from '../get-rows-by-field';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { CitiesDbEnum } from '../../../../enums/cities/cities-db.enum';
import { isCities } from '../../../../models/city/check-is-models/check-is-cities';


export const parseCityIdsStrInResponse = (callback: (err: ErrorInterface, statusCode: number, stepsResults: UserResponseModel[]) => void,
                                          usersDb: UserDbModel[], usersRes: UserResponseModel[]) => {
  usersDb.forEach((elem, idx) => {
    switch (true) {
      case !!(elem.cityIdsStr):
        const cityIds: number = JSON.parse(elem.cityIdsStr);
        getRowsByField((err, statusCode, result) => {
          if (!err && isCities(result)) {
            usersRes[idx].cities = result;
            if (idx === usersDb.length - 1) {
              callback(null, 200, usersRes);
            }
          } else {
            callback(err, statusCode, null);
          }
        }, TablesEnum.Cities, cityIds, CitiesDbEnum.Id)
        break;

      default:
        if (idx === usersDb.length - 1) {
          callback(null, 200, usersRes);
        }
    }
  })
}
