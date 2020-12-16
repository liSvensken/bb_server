import { ErrorInterface } from '../../../utils/errors/error.interface';
import { queryUpdateRowByField } from '../querys/query-update-row-by-field';
import { ErrorTypes } from '../../../utils/errors/error.types';
import { TablesEnum } from '../../../enums/tables-name.enum';
import { SqlResult } from '../interfaces/sql-result.interface.';

export const updateRow = (callback: (err: ErrorInterface, statusCode: number, result?: SqlResult) => void,
                          tableName: string, updateFieldStr: string, attrFieldName: string, attrField: string) => {

  let error: ErrorInterface = {
    type: '',
    field: '',
    message: '',
    status: 0,
  };

  queryUpdateRowByField((err, result) => {
    if (!err) {
      callback(null, 204, result);
    } else {
      error.type = ErrorTypes.InternalServerError;
      error.message = err.message;
      error.status = 500;
      callback(error, error.status);
    }
  }, tableName, updateFieldStr, attrFieldName, attrField)
}
