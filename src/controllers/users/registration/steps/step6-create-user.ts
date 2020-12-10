import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { queryCreateRow } from '../../../common/querys/query-create-row';
import { ErrorTypes } from '../../../../utils/errors/error.types';
import { UserRegistrationRequest } from '../interfaces/user-registration-request.interface';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { UserDbEnum } from '../../../../enums/users-table/user-db.enum';
import { StepsResultRegistration } from '../interfaces/steps-result-registration.interface';
import { createRow } from '../../../common/steps/create-row';

export const step6CreateUser = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultRegistration) => void,
                                user: UserRegistrationRequest, stepsResults: StepsResultRegistration) => {
  const fieldsNameStr = `
      ${ UserDbEnum.Role }, 
      ${ UserDbEnum.Nickname }, 
      ${ UserDbEnum.Email }, 
      ${ UserDbEnum.LastsName }, 
      ${ UserDbEnum.FirsName }, 
      ${ UserDbEnum.ServiceIdsStr }, 
      ${ UserDbEnum.CityIdsStr }, 
      ${ UserDbEnum.Phone }, 
      ${ UserDbEnum.Gender }, 
      ${ UserDbEnum.Birthday }, 
      ${ UserDbEnum.Avatar }, 
      ${ UserDbEnum.InfoYourself }
      `;

  createRow((err, statusCode, result) => {
      if (!err) {
          stepsResults.step6CreateUser = result;
          callback(null, 200, stepsResults);
      } else {
          callback(err, statusCode, null);
      }
  }, TablesEnum.Users, fieldsNameStr, user);
}


