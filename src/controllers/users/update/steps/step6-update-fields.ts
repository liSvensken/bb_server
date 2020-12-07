import { queryPatchRowOnId } from '../../../common/querys/query-patch-row-on-id';
import { ErrorTypes } from '../../../../utils/errors/error.types';
import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { UserRegistrationRequest } from '../../registration/interfaces/user-registration-request.interface';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { UserRequestEnum } from '../../../../enums/user-request.enum';

export const step6UpdateFields = (callback: (err: any, statusCode: number, result?: any) => void,
                                  user: UserRegistrationRequest, reqParamsId: string) => {

  let error: ErrorInterface = {
    type: '',
    field: '',
    message: '',
    status: 0,
  };
  let queryFieldsPatch = '';
  const addQueryFieldsPatch = (field: any, fieldName: string) => {
    if (field) {
      queryFieldsPatch += !queryFieldsPatch ? `${ fieldName } = '${ field }'` : `, ${ fieldName } = '${ field }'`;
    }
  }

  addQueryFieldsPatch(user.nickname, UserRequestEnum.Nickname);
  addQueryFieldsPatch(user.email, UserRequestEnum.Email);
  addQueryFieldsPatch(user.lastsName, UserRequestEnum.LastsName);
  addQueryFieldsPatch(user.firsName, UserRequestEnum.FirsName);
  addQueryFieldsPatch(user.serviceIds, UserRequestEnum.ServiceIds);
  addQueryFieldsPatch(user.cityIds, UserRequestEnum.CityIds);
  addQueryFieldsPatch(user.phone, UserRequestEnum.Phone);
  addQueryFieldsPatch(user.gender, UserRequestEnum.Gender);
  addQueryFieldsPatch(user.birthday, UserRequestEnum.Birthday);
  addQueryFieldsPatch(user.avatar, UserRequestEnum.Avatar);
  addQueryFieldsPatch(user.infoYourself, UserRequestEnum.InfoYourself);

  queryPatchRowOnId((err, result) => {
    switch (true) {
      case !!(err):
        error.type = ErrorTypes.SqlError;
        error.message = err.message;
        error.status = 500;
        callback(error, error.status);
        break;

      case (!result.affectedRows):
        error.type = ErrorTypes.InvalidParam;
        error.field = TablesEnum.Users;
        error.message = `the "${ error.field }" field does not exist`;
        error.status = 404;
        callback(error, error.status);
        break;

      default:
        callback(null, null, result);
    }
  }, TablesEnum.Users, queryFieldsPatch, reqParamsId)
}
