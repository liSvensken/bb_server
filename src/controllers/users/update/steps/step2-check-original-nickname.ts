import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { checkOriginalOnField } from '../../../common/steps/check-original-on-field';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { UserDbEnum } from '../../../../enums/users-table/user-request.enum';
import { StepsResultUpdateUser } from '../interfaces/steps-result-update-user.interface';
import { UserRegistrationRequest } from '../../registration/interfaces/user-registration-request.interface';

export const step2CheckOriginalNickname = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultUpdateUser) => void,
                                           userNickname: string, stepsResults: StepsResultUpdateUser) => {

  if (userNickname) {
    checkOriginalOnField((err, statusCode) => {
      if (!err) {
        callback(null, 200, stepsResults);
      } else {
        callback(err, statusCode, null);
      }
    }, TablesEnum.Users, userNickname, UserDbEnum.Nickname);
  } else {
    callback(null, 200, stepsResults);
  }
}
