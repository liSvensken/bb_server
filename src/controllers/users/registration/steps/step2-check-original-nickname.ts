import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { checkOriginalOnField } from '../../../common/steps/check-original-on-field';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { UserRequestEnum } from '../../../../enums/users-table/user-request.enum';

export const step2CheckOriginalNickname = (callback: (err: ErrorInterface, statusCode: number) => void,
                                           userNickname?: string) => {
  checkOriginalOnField(callback, TablesEnum.Users, userNickname, UserRequestEnum.Nickname);
}
