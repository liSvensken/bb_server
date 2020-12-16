import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { checkOriginalOnField } from '../../../common/steps/check-original-on-field';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { StepsResultUpdateUser } from '../interfaces/steps-result-update-user.interface';
import { UserDbEnum } from '../../../../enums/users/user-db.enum';

export  const step4CheckOriginalEmail = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultUpdateUser) => void,
                                         userEmail: string, stepsResults: StepsResultUpdateUser) => {

  switch (true) {
    case !!(userEmail):
      checkOriginalOnField((err, statusCode) => {
        if (!err) {
          callback(null, 200, stepsResults);
        } else {
          callback(err, statusCode, null);
        }
      }, TablesEnum.Users, userEmail, UserDbEnum.Email);
      break;

    default:
      callback(null, 200, stepsResults);
  }
}
