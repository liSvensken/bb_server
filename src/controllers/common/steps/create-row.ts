import { ErrorInterface } from '../../../utils/errors/error.interface';
import { queryCreateRow } from '../querys/query-create-row';
import { ErrorTypes } from '../../../utils/errors/error.types';
import { SqlResult } from '../interfaces/sql-result.interface.';

export const createRow = (callback: (error: ErrorInterface, statusCode: number, result: SqlResult) => void,
                          tableName: string, fieldsNameStr: string, fieldsValue: object) => {
  let error: ErrorInterface = {
    type: '',
    field: '',
    message: '',
    status: 0,
  };

  let fieldsValueStr = '';

  Object.keys(fieldsValue).forEach(key => {
    let fieldValue: number | number[] | string = fieldsValue[key as keyof object];

    switch (true) {
      case !fieldValue:
        fieldValue = null;
        break;

      case typeof fieldValue === 'string':
        fieldValue = `'${ fieldValue }'`;
        break;

      case typeof fieldValue === 'object':
        fieldValue = `'${ JSON.stringify(fieldValue) }'`;
        break;
    }

    fieldsValueStr += !fieldsValueStr ? `${ fieldValue }` : `, ${ fieldValue }`;
  })

  queryCreateRow((err, result) => {
    if (!err) {
      callback(null, 200, result);
    } else {
      error.type = ErrorTypes.InternalServerError;
      error.message = err.message;
      error.status = 500;
      callback(error, error.status, result);
    }
  }, tableName, fieldsNameStr, fieldsValueStr);
}
