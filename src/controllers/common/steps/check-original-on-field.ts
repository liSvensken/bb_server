import { ErrorInterface } from '../../../utils/errors/error.interface';
import { queryGetRowOnField } from '../querys/query-get-row-on-field';
import { ErrorTypes } from '../../../utils/errors/error.types';

export const checkOriginalOnField = (callback: (err: ErrorInterface, statusCode: number) => void,
                                     table: string, field: any, fieldName: string) => {
  let error: ErrorInterface = {
    type: '',
    field: '',
    message: '',
    status: 0,
  };

  queryGetRowOnField((err, result) => {
    switch (true) {
      case !!(err):
        error.type = ErrorTypes.SqlError;
        error.message = err.message;
        error.status = 500;
        callback(error, error.status);
        break;

      case !!(Object.keys(result).length):
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
