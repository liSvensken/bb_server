import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { UserDbModel } from '../../../../models/user/user-db.model';
import { getRowsList } from '../../../common/steps/get-rows-list';
import { TablesEnum } from '../../../../enums/tables-name.enum';

export const step1GetUsersFromDb = (callback: (err: ErrorInterface, statusCode: number, result?: UserDbModel[]) => void,
                                    limit?: number, offset?: number) => {
  getRowsList(callback, TablesEnum.Users, limit, offset);
}
