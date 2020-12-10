import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { UserDbModel } from '../../../../models/user/user-db.model';
import { UserResponseModel } from '../../../../models/user/user-response.model';
import { getRowByField } from '../get-row-by-field';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { CitiesDbEnum } from '../../../../enums/cities-table/cities-db.enum';
import { isCities } from '../../../../models/city/check-is-models/check-is-cities';


export const parseCitiesInResponse = (callback: (err: ErrorInterface, statusCode: number, stepsResults: UserResponseModel[]) => void,
                                      usersDb: UserDbModel[], usersRes: UserResponseModel[]) => {
  usersDb.forEach((elem, idx) => {
    if (elem.cityIdsStr) {
      const cityIds: number = JSON.parse(elem.cityIdsStr);
      getRowByField((err, statusCode, result) => {
        if (!err && isCities(result)) {
          usersRes[idx].cities = result;
          if (idx === usersDb.length - 1) {
            callback(null, 200, usersRes);
          }
        } else {
          callback(err, statusCode, null);
        }
      }, TablesEnum.Cities, cityIds, CitiesDbEnum.Id)
    }
  })
}
