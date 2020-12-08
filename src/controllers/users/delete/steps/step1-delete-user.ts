import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { UserDbModel } from '../../../../models/user/user-db.model';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { UserDbEnum } from '../../../../enums/users-table/user-db.enum';
import { deleteRowByField } from '../../../common/steps/delete-row-by-field';

export const step1DeleteUser = (callback: (err: ErrorInterface, statusCode: number, result?: UserDbModel[]) => void,
                             id: string) => {
  deleteRowByField(callback, TablesEnum.Users, JSON.parse(id), UserDbEnum.Id);
}
