import { ErrorInterface } from '../../../utils/errors/error.interface';
import { queryUpdateRowOnField } from '../querys/query-update-row-on-field';
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

  queryUpdateRowOnField((err, result) => {
    if (!err) {
      switch (true) {
        case !!(err):
          error.type = ErrorTypes.InternalServerError;
          error.message = err.message;
          error.status = 500;
          callback(error, error.status);
          break;

        case (!result.affectedRows):
          error.type = ErrorTypes.BadRequest;
          error.field = TablesEnum.Users;
          error.message = `Row ${ updateFieldStr } with ${ attrFieldName } = ${ attrField } does not exist`;
          error.status = 404;
          callback(error, error.status);
          break;

        default:
          callback(null, null, result);
      }
    }
  }, tableName, updateFieldStr, attrFieldName, attrField)
}
