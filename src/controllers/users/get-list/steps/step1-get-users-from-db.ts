import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { GetUsersListRequest } from '../interfaces/get-users-list-request.interface';
import { UserDbModel } from '../../../../models/user/user-db.model';
import { getRowsListForTable } from '../../../common/steps/get-rows-list-for-table';
import { TablesEnum } from '../../../../enums/tables-name.enum';

export const step1GetUsersFromDb = (callback: (err: ErrorInterface, statusCode: number, result?: UserDbModel[]) => void,
                                    reqBody: GetUsersListRequest) => {
  getRowsListForTable((err, statusCode, result) => {
    if (!err) {
      callback(null, 200, result)
    } else {
      callback(err, statusCode, result);
    }
  }, TablesEnum.Users, reqBody.limit, reqBody.offset);
}
