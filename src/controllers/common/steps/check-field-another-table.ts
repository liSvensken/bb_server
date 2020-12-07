import { ErrorInterface } from '../../../utils/errors/error.interface';
import { queryGetRowOnField } from '../querys/query-get-row-on-field';
import { ErrorTypes } from '../../../utils/errors/error.types';

let error: ErrorInterface = {
  type: '',
  field: '',
  message: '',
  status: 0,
};

export const checkFieldAnotherTable = (callback: (err: ErrorInterface, statusCode: number) => void,
                                       anotherTable: string, field: number[], fieldName: string) => {
  let query = '';

  field.forEach(elem => {
    if (!query) {
      query = `id = ${ elem }`;
    } else {
      query += ` OR id = ${ elem }`
    }
  })

  queryGetRowOnField((err, result) => {
    if (err) {
      error.type = ErrorTypes.SqlError;
      error.message = err.message;
      error.status = 500;
      callback(error, error.status);
    } else if (result.length !== field.length) {
      error.type = ErrorTypes.InvalidParam;
      error.field = fieldName;
      error.message = `The selected values for the "${ error.field }" field do not exist`;
      error.status = 403;
      callback(error, error.status);
    } else {
      callback(null, 200);
    }
  }, anotherTable, query);
}
