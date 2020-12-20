import { ErrorInterface } from '../../../../../utils/errors/error.interface';
import { UserDbModel } from '../../../../../models/user/user-db.model';
import { UserResponseModel } from '../../../../../models/user/user-response.model';
import { getRowsByField } from '../../get-rows-by-field';
import { TablesEnum } from '../../../../../enums/tables-name.enum';
import { CitiesDbEnum } from '../../../../../enums/cities/cities-db.enum';
import { isCities, isCity } from '../../../../../models/city/check-is-models/check-is-cities';
import { CityModel } from '../../../../../models/city/city.model';


export const parseCityFromUser = (callback: (err: ErrorInterface, statusCode: number, cityRes: CityModel) => void,
                                  cityId: number) => {

  switch (true) {
    case !cityId:
      callback(null, 204, null);
      break;

    default:
      getRowsByField((err, statusCode, result) => {
        if (!err && isCities(result)) {
          callback(null, 200, result[0]);
        } else {
          callback(err, statusCode, null);
        }
      }, TablesEnum.Cities, cityId, CitiesDbEnum.Id)
  }
}
