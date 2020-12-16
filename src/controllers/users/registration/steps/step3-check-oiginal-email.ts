import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { checkOriginalOnField } from '../../../common/steps/check-original-on-field';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { StepsResultRegistration } from '../interfaces/steps-result-registration.interface';
import { UserDbEnum } from '../../../../enums/users/user-db.enum';

export  const step3CheckOriginalEmail = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultRegistration) => void,
                                         userEmail: string, stepsResults: StepsResultRegistration) => {
  checkOriginalOnField((err, statusCode) => {
    if (!err) {
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, TablesEnum.Users, userEmail, UserDbEnum.Email);
}
