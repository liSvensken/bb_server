import { ErrorInterface } from '../../../utils/errors/error.interface';
import { queryGetRowByField } from '../querys/query-get-row-by-field';
import { ErrorTypes } from '../../../utils/errors/error.types';

export const checkFieldsAnotherTable = (callback: (err: ErrorInterface, statusCode: number) => void,
                                        anotherTable: string, fieldsValuesArr: number[], fieldsName: string, tableName: string) => {
  let error: ErrorInterface = {
    type: '',
    field: '',
    message: '',
    status: 0,
  };

  let query = '';

  fieldsValuesArr.forEach(elem => {
    query += !query ? `${ fieldsName } = ${ elem }` : ` OR ${ fieldsName } = ${ elem }`;
  })

  queryGetRowByField((err, result) => {
    switch (true) {
      case !!(err):
        error.type = ErrorTypes.InternalServerError;
        error.message = err.message;
        error.status = 500;
        callback(error, error.status);
        break;

      case result.length !== fieldsValuesArr.length:
        error.type = ErrorTypes.NotFound;
        error.field = tableName;
        error.message = `The selected values for the "${ error.field }" field do not exist`;
        error.status = 404;
        callback(error, error.status);
        break;

      default:
        callback(null, 200);
    }
  }, anotherTable, query);
}
