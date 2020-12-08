import { ErrorInterface } from '../../../utils/errors/error.interface';
import { queryGetRowOnField } from '../querys/query-get-row-on-field';
import { ErrorTypes } from '../../../utils/errors/error.types';

export const getRowByField = (callback: (err: ErrorInterface, statusCode: number, result: any[]) => void,
                              table: string, field: string | number | number[], fieldName: string) => {
  let error: ErrorInterface = {
    type: '',
    field: '',
    message: '',
    status: 0,
  };

  let query = '';

  if (typeof field === 'object') {
    field.forEach(elem => {
      query += !query ? `${ fieldName } = ${ elem }` : ` OR ${ fieldName } = ${ elem }`
    })
  } else {
    query = `${ fieldName } = ${ field }`;
  }

  queryGetRowOnField((err, result) => {
    if (!err) {
      callback(null, 200, result)
    } else {
      error.type = ErrorTypes.SqlError;
      error.message = err.message;
      error.status = 500;
      callback(error, error.status, null);
    }
  }, table, query);
}
