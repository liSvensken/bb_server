import { ErrorInterface } from '../../../utils/errors/error.interface';
import { queryDeleteRowByField } from '../querys/query-delete-row-by-field';
import { ErrorTypes } from '../../../utils/errors/error.types';
import { SqlResult } from '../interfaces/sql-result.interface.';

export const deleteRowByField = (callback: (err: ErrorInterface, statusCode: number, result: SqlResult) => void,
                                 table: string, field: string | number, fieldName: string) => {
  let error: ErrorInterface = {
    type: '',
    field: '',
    message: '',
    status: 0,
  };

  queryDeleteRowByField((err, result) => {
    if (!err) {
      callback(null, 200, result)
    } else {
      error.type = ErrorTypes.InternalServerError;
      error.message = err.message;
      error.status = 500;
      callback(error, error.status, null);
    }
  }, table, `${ fieldName } = ${ field }`);
}
