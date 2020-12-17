import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { getRowsByField } from '../get-rows-by-field';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { ServicesDbEnum } from '../../../../enums/services/services-db.enum';
import { UserDbModel } from '../../../../models/user/user-db.model';
import { UserResponseModel } from '../../../../models/user/user-response.model';
import { isServices } from '../../../../models/service/check-is-models/check-is-services';

export const parseServicesDbInResponse = (callback: (err: ErrorInterface, statusCode: number, userRes: UserResponseModel[]) => void,
                                          usersDb: UserDbModel[], usersRes: UserResponseModel[]) => {

  usersDb.forEach((elem, idx) => {
    switch (true) {
      case !!(elem.serviceIdsStr):
        const serviceIds: number = JSON.parse(elem.serviceIdsStr);
        getRowsByField((err, statusCode, result) => {
          if (!err && isServices(result)) {
            usersRes[idx].services = result;
            if (idx === usersDb.length - 1) {
              callback(null, 200, usersRes);
            }
          } else {
            callback(err, statusCode, null);
          }
        }, TablesEnum.Services, serviceIds, ServicesDbEnum.Id)
        break;

      default:
        if (idx === usersDb.length - 1) {
          callback(null, 200, usersRes);
        }
    }
  })
}
