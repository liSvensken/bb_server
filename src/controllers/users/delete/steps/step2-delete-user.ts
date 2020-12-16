import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { UserDbEnum } from '../../../../enums/users/user-db.enum';
import { deleteRowByField } from '../../../common/steps/delete-row-by-field';

export const step2DeleteUser = (callback: (err: ErrorInterface, statusCode: number) => void,
                                id: string) => {
  deleteRowByField((err, statusCode) => {
    if (!err) {
      callback(null, statusCode);
    } else {
      callback(err, statusCode);
    }
  }, TablesEnum.Users, JSON.parse(id), UserDbEnum.Id);
}
