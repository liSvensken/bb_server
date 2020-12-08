import { ErrorInterface } from '../../../utils/errors/error.interface';
import { queryGetRowOnField } from '../querys/query-get-row-on-field';
import { ErrorTypes } from '../../../utils/errors/error.types';

export const checkFieldAnotherTable = (callback: (err: ErrorInterface, statusCode: number) => void,
                                       anotherTable: string, field: number[], fieldName: string) => {
  let error: ErrorInterface = {
    type: '',
    field: '',
    message: '',
    status: 0,
  };

  let query = '';

  field.forEach(elem => {
    query += !query ? `id = ${ elem }` : ` OR id = ${ elem }`;
  })

  queryGetRowOnField((err, result) => {
    switch (true) {
      case !!(err):
        error.type = ErrorTypes.SqlError;
        error.message = err.message;
        error.status = 500;
        callback(error, error.status);
        break;

      case result.length !== field.length:
        error.type = ErrorTypes.InvalidParam;
        error.field = fieldName;
        error.message = `The selected values for the "${ error.field }" field do not exist`;
        error.status = 403;
        callback(error, error.status);
        break;

      default:
        callback(null, 200);
    }
  }, anotherTable, query);
}
