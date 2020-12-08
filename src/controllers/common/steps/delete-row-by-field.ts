import { ErrorInterface } from '../../../utils/errors/error.interface';
import { queryDeleteRowOnField } from '../querys/query-delete-row-on-field';
import { ErrorTypes } from '../../../utils/errors/error.types';

export const deleteRowByField = (callback: (err: ErrorInterface, statusCode: number, result: any[]) => void,
                                 table: string, field: string | number, fieldName: string) => {
  let error: ErrorInterface = {
    type: '',
    field: '',
    message: '',
    status: 0,
  };

  queryDeleteRowOnField((err, result) => {
    if (!err) {
      callback(null, 200, result)
    } else {
      error.type = ErrorTypes.SqlError;
      error.message = err.message;
      error.status = 500;
      callback(error, error.status, null);
    }
  }, table, `${ fieldName } = ${ field }`);
}
