import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { getRowByField } from '../../../common/steps/get-row-by-field';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { UserDbEnum } from '../../../../enums/users-table/user-db.enum';
import { UserDbModel } from '../../../../models/user/user-db.model';

export const step1GetUser = (callback: (err: ErrorInterface, statusCode: number, result?: UserDbModel[]) => void,
                             id: string) => {
  getRowByField(callback, TablesEnum.Users, JSON.parse(id), UserDbEnum.Id);
}
