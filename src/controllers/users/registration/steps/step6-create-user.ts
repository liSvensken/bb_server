import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { queryCreateRow } from '../../../common/querys/query-create-row';
import { ErrorTypes } from '../../../../utils/errors/error.types';
import { UserRegistrationRequest } from '../interfaces/user-registration-request.interface';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { UserDbEnum } from '../../../../enums/users-table/user-db.enum';

export const step6CreateUser = (callback: (err: ErrorInterface, statusCode: number, result?: any) => void,
                                user?: UserRegistrationRequest) => {
  let error: ErrorInterface = {
    type: '',
    field: '',
    message: '',
    status: 0,
  };

  let valueQuery = `'${ user.role }', '${ user.nickname }', '${ user.email }'`;

  const addValueQueryOptionalField = (field: any) => {
    if (typeof field === 'object') {
      field = JSON.stringify(field);
    }
    valueQuery += field ? `, '${ field }'` : `, ${ null }`;
  }
  addValueQueryOptionalField(user.lastsName);
  addValueQueryOptionalField(user.firsName);
  addValueQueryOptionalField(user.serviceIds);
  addValueQueryOptionalField(user.cityIds);
  addValueQueryOptionalField(user.phone);
  addValueQueryOptionalField(user.gender);
  addValueQueryOptionalField(user.birthday);
  addValueQueryOptionalField(user.avatar);
  addValueQueryOptionalField(user.infoYourself);

  queryCreateRow((err, result) => {
        if (!err) {
          callback(null, null, result);
        } else {
          error.type = ErrorTypes.SqlError;
          error.message = err.message;
          error.status = 500;
          callback(error, error.status);
        }
      }, TablesEnum.Users,
      `
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
      `,
      valueQuery)
}


