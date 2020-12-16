import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { checkOriginalOnField } from '../../../common/steps/check-original-on-field';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { StepsResultRegistration } from '../interfaces/steps-result-registration.interface';
import { UserDbEnum } from '../../../../enums/users/user-db.enum';

export const step2CheckOriginalNickname = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultRegistration) => void,
                                           userNickname: string, stepsResults: StepsResultRegistration) => {
  checkOriginalOnField((err, statusCode) => {
    if (!err) {
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, TablesEnum.Users, userNickname, UserDbEnum.Nickname);
}
