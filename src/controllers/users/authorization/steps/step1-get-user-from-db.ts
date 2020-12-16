import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { queryGetRowsByField } from '../../../common/querys/query-get-rows-by-field';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { UserDbEnum } from '../../../../enums/users/user-db.enum';
import { StepsResultAuthorization } from '../interfaces/steps-result-authorization.interface';
import { isUsersDb } from '../../../../models/user/check-is-models/check-is-users-db';
import { ErrorTypes } from '../../../../utils/errors/error.types';

export const step1GetUserFromDb = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultAuthorization) => void,
                                   login: string, stepsResults: StepsResultAuthorization) => {

  let error: ErrorInterface = {
    type: '',
    field: '',
    message: '',
    status: 0,
  };

  let queryFields = `${ UserDbEnum.Nickname } = '${ login }' OR ${ UserDbEnum.Email } = '${ login }'`;

  queryGetRowsByField((err, result) => {
    if (!err && isUsersDb(result)) {
      if (result) {
        stepsResults.step1GetUserFromDb = result;
        callback(null, 200, stepsResults);
      } else {
        error.type = ErrorTypes.Unauthorized;
        error.message = 'Invalid login or password';
        error.status = 401;
        callback(null, error.status, null);
      }
    } else {
      error.type = ErrorTypes.InternalServerError;
      error.message = err.message;
      error.status = 500;
      callback(error, error.status, null);
    }
  }, TablesEnum.Users, queryFields);
}
