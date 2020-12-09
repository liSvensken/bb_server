import { ErrorInterface } from '../../../utils/errors/error.interface';
import { queryGetCountRows } from '../querys/query-get-count-rows';
import { ErrorTypes } from '../../../utils/errors/error.types';

export const getCountRowsByField = (callback: (err: ErrorInterface, statusCode: number, result?: number) => void,
                                    table: string, fieldName: string) => {
  let error: ErrorInterface = {
    type: '',
    field: '',
    message: '',
    status: 0,
  };

  queryGetCountRows((err, result) => {
    if (!err) {
      callback(null, 200, result);
    } else {
      error.type = ErrorTypes.InternalServerError;
      error.message = err.message;
      error.status = 500;
      callback(error, error.status);
    }
  }, table, fieldName);
}
