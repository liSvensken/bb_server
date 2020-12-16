import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { UserRegistrationRequest } from '../interfaces/user-registration-request.interface';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { UserDbEnum } from '../../../../enums/users/user-db.enum';
import { StepsResultRegistration } from '../interfaces/steps-result-registration.interface';
import { createRow } from '../../../common/steps/create-row';
import { UserRole } from '../../../../types/user-role.type';
import { UserGender } from '../../../../types/user-gender.type';

export const step5CreateUser = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultRegistration) => void,
                                user: UserRegistrationRequest, stepsResults: StepsResultRegistration) => {
  user.password = stepsResults.step4HashPassword;

  let fieldsValueStr = ``;
  let fieldsNameStr = ``;

  const addValue = (field: string | number[] | UserRole | UserGender, fieldNameDb: string) => {
    if (field) {
      if (typeof field === 'object') {
        field = `${ JSON.stringify(field) }`;
      }
      fieldsValueStr += !fieldsValueStr ? `'${ field }'` : `, '${ field }'`;
      fieldsNameStr += !fieldsNameStr ? `${ fieldNameDb }` : `, ${ fieldNameDb }`
    }
  }

  addValue(user.role, UserDbEnum.Role);
  addValue(user.nickname, UserDbEnum.Nickname);
  addValue(user.email, UserDbEnum.Email);
  addValue(user.password, UserDbEnum.PasswordHash);
  addValue(user.lastsName, UserDbEnum.LastsName);
  addValue(user.firsName, UserDbEnum.FirsName);
  addValue(user.serviceIds, UserDbEnum.ServiceIdsStr);
  addValue(user.cityIds, UserDbEnum.CityIdsStr);
  addValue(user.phone, UserDbEnum.Phone);
  addValue(user.gender, UserDbEnum.Gender);
  addValue(user.birthday, UserDbEnum.Birthday);
  addValue(user.avatar, UserDbEnum.Avatar);
  addValue(user.infoYourself, UserDbEnum.InfoYourself);

  createRow((err, statusCode, result) => {
    if (!err) {
      stepsResults.step5CreateUser = {
        id: result.insertId,
        role: user.role,
        nickname: user.nickname
      }
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, TablesEnum.Users, fieldsNameStr, fieldsValueStr);
}


