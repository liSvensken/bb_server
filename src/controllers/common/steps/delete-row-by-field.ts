import { ErrorInterface } from '../../../utils/errors/error.interface';
import { queryDeleteRowByField } from '../querys/query-delete-row-by-field';
import { ErrorTypes } from '../../../utils/errors/error.types';
import { SqlResult } from '../interfaces/sql-result.interface.';

export const deleteRowByField = (callback: (err: ErrorInterface, statusCode: number) => void,
                                 table: string, field: string | number, fieldName: string) => {
  let error: ErrorInterface = {
    type: '',
    field: '',
    message: '',
    status: 0,
  };

  queryDeleteRowByField((err, result) => {
    switch (true) {
      case !err:
        if (result.affectedRows) {
          callback(null, 204);
        } else {
          error.type = ErrorTypes.NotFound;
          error.message = 'The row is not found';
          error.status = 404;
          callback(error, error.status);
        }
        break;

      default:
        error.type = ErrorTypes.InternalServerError;
        error.message = err.message;
        error.status = 500;
        callback(error, error.status);
    }
  }, table, `${ fieldName } = ${ field }`);
}
