import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { getRowByField } from '../get-row-by-field';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { ServicesDbEnum } from '../../../../enums/services-table/services-db.enum';
import { UserDbModel } from '../../../../models/user/user-db.model';
import { UserResponseModel } from '../../../../models/user/user-response.model';
import { isServices } from '../../../../models/service/check-is-models/check-is-services';

export const parseServicesInResponse = (callback: (err: ErrorInterface, statusCode: number, userRes: UserResponseModel[]) => void,
                                             usersDb: UserDbModel[], usersRes: UserResponseModel[]) => {

  usersDb.forEach((elem, idx) => {
    if (elem.serviceIdsStr) {
      const serviceIds: number = JSON.parse(elem.serviceIdsStr);
      getRowByField((err, statusCode, result) => {
        if (!err && isServices(result)) {
          usersRes[idx].services = result;
          if (idx === usersDb.length - 1) {
            callback(null, 200, usersRes);
          }
        } else {
          callback(err, statusCode, null);
        }
      }, TablesEnum.Services, serviceIds, ServicesDbEnum.Id)
    }
  })
}
