import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { checkOriginalOnField } from '../../../common/steps/check-original-on-field';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { UserRequestEnum } from '../../../../enums/users-table/user-request.enum';

export  const step3CheckOriginalEmail = (callback: (err: ErrorInterface, statusCode: number) => void,
                                         userEmail: string) => {
  if (userEmail) {
    checkOriginalOnField(callback, TablesEnum.Users, userEmail, UserRequestEnum.Email);
  } else {
    callback(null, 200);
  }
}
