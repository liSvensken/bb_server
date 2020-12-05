import { queryGetRowOnField } from '../../services/querys.services';
import { ErrorTypes } from '../../utils/api/enums/error-types.enum';
import { ErrorInterface } from '../../utils/api/interfaces/error.interface';
import { UserRole } from '../../enums/user.role';

let error: ErrorInterface = {
  type: '',
  field: '',
  message: '',
  status: 0,
};

export const checkOriginalOnField = (callback: (err: any, statusCode: number) => void,
                                     table: string, field: any, fieldName: string) => {
  queryGetRowOnField((err, result) => {
    switch (true) {
      case !!(err):
        error.type = ErrorTypes.SqlError;
        error.message = err.message;
        error.status = 500;
        callback(error, error.status);
        break;

      case !!(!!Object.keys(result).length):
        error.type = ErrorTypes.InvalidParam;
        error.field = fieldName;
        error.message = `user with field "${ error.field }" already exists`;
        error.status = 403;
        callback(error, error.status);
        break;

      default:
        callback(null, 200);
    }
  }, table, `${ fieldName }='${ field }'`);
}

export const checkFieldAnotherTable = (callback: (err: any, statusCode: number) => void,
                                       anotherTable: string, field: number[], fieldName: string, query: string) => {
  if (field) {
    queryGetRowOnField((err, result) => {
      if (err) {
        error.type = ErrorTypes.SqlError;
        error.message = err.message;
        error.status = 500;
        callback(error, error.status);
      } else if (result.length !== field.length) {
        error.type = ErrorTypes.InvalidParam;
        error.field = fieldName;
        error.message = `The selected values for the "${ error.field }" field do not exist`;
        error.status = 403;
        callback(error, error.status);
      } else {
        callback(null, 200);
      }
    }, anotherTable, query);
  }
}
