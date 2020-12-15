import { ErrorInterface } from '../../../utils/errors/error.interface';
import { ErrorTypes } from '../../../utils/errors/error.types';
import { UserDbModel } from '../../../models/user/user-db.model';
import { queryGetRowsByFieldLimit } from '../querys/query-get-rows-by-field-limit';

export const getRowsByFieldLimit =
    (callback: (err: ErrorInterface, statusCode: number, result: UserDbModel[]) => void,
     table: string, field: string | number, fieldName: string, limit: number, offset: number) => {

      let error: ErrorInterface = {
        type: '',
        field: '',
        message: '',
        status: 0,
      };

      const queryCondition = `${ fieldName } = '${ field }'`;

      queryGetRowsByFieldLimit((err, result) => {
        if (!err) {
          callback(null, 200, result)
        } else {
          error.type = ErrorTypes.InternalServerError;
          error.message = err.message;
          error.status = 500;
          callback(error, error.status, null);
        }
      }, table, queryCondition, limit, offset)
    }
