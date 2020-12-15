import { ErrorInterface } from '../../../utils/errors/error.interface';
import { queryCountRows } from '../querys/query-count-rows';
import { ErrorTypes } from '../../../utils/errors/error.types';

export const countRows = (callback: (err: ErrorInterface, statusCode: number, result: number) => void,
                          table: string, fieldName: string) => {
  let error: ErrorInterface = {
    type: '',
    field: '',
    message: '',
    status: 0,
  };

  queryCountRows((err, result) => {
    if (!err) {
      callback(null, 200, result);
    } else {
      error.type = ErrorTypes.InternalServerError;
      error.message = err.message;
      error.status = 500;
      callback(error, error.status, null);
    }
  }, table, fieldName);
}
