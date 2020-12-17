import { ErrorInterface } from '../../../utils/errors/error.interface';
import { queryUpdateRowByField } from '../querys/query-update-row-by-field';
import { ErrorTypes } from '../../../utils/errors/error.types';
import { TablesEnum } from '../../../enums/tables-name.enum';
import { SqlResult } from '../interfaces/sql-result.interface.';

export const updateRow = (callback: (err: ErrorInterface, statusCode: number) => void,
                          tableName: string, updateFieldStr: string, attrFieldName: string, attrField: number | string) => {

  let error: ErrorInterface = {
    type: '',
    field: '',
    message: '',
    status: 0,
  };

  if (typeof attrField === 'string') {
    attrField = `'${ attrField }'`
  }

  queryUpdateRowByField((err) => {
    if (!err) {
      callback(null, 204);
    } else {
      error.type = ErrorTypes.InternalServerError;
      error.message = err.message;
      error.status = 500;
      callback(error, error.status);
    }
  }, tableName, updateFieldStr, attrFieldName, attrField)
}
