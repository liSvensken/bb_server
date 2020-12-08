import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { getCountRowsByField } from '../../../common/steps/get-count-rows-by-field';
import { UserDbEnum } from '../../../../enums/users-table/user-db.enum';

export const step3GetTotalItems = (callback: (err: ErrorInterface, statusCode: number, result?: number) => void) => {
  getCountRowsByField(callback, TablesEnum.Users, UserDbEnum.Id);
}
