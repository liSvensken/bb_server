import { ErrorInterface } from '../../../utils/errors/error.interface';
import { queryGetRowList } from '../querys/query-get-row-list';
import { ErrorTypes } from '../../../utils/errors/error.types';

export const getRowsList = (callback: (err: ErrorInterface, statusCode: number, result?: any[]) => void,
                            table: string, limit: number, offset: number) => {
  let error: ErrorInterface = {
    type: '',
    field: '',
    message: '',
    status: 0,
  };

  queryGetRowList((err, result) => {
    if (!err) {
      callback(null, 200, result)
    } else {
      error.type = ErrorTypes.SqlError;
      error.message = err.message;
      error.status = 500;
      callback(error, error.status, null);
    }
  }, table, limit, offset)
}
