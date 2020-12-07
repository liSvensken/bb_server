import { ErrorInterface } from '../../../utils/errors/error.interface';
import { queryGetRowOnField } from '../querys/query-get-row-on-field';
import { ErrorTypes } from '../../../utils/errors/error.types';

export const getItemsTableByIds = (callback: (err: ErrorInterface, statusCode: number, result: any) => void,
                                       anotherTable: string, field: number[], fieldName: string) => {
  let error: ErrorInterface = {
    type: '',
    field: '',
    message: '',
    status: 0,
  };

  let query = '';

  field.forEach(elem => {
    if (!query) {
      query = `id = ${ elem }`;
    } else {
      query += ` OR id = ${ elem }`
    }
  })

  queryGetRowOnField((err, result) => {
    if (!err) {
      callback(null, 200, result)
    } else {
      error.type = ErrorTypes.SqlError;
      error.message = err.message;
      error.status = 500;
      callback(error, error.status, null);
    }
  }, anotherTable, query);
}
