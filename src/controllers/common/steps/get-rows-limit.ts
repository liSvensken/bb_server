import { ErrorInterface } from '../../../utils/errors/error.interface';
import { queryGetRowsLimit } from '../querys/query-get-rows-limit';
import { ErrorTypes } from '../../../utils/errors/error.types';
import { UserDbModel } from '../../../models/user/user-db.model';
import { ServiceModel } from '../../../models/service/service.model';
import { CityModel } from '../../../models/city/city.model';

export const getRowsLimit =
    (callback: (err: ErrorInterface, statusCode: number, result: UserDbModel[] | ServiceModel[] | CityModel[]) => void,
                            table: string, limit: number, offset: number) => {
  let error: ErrorInterface = {
    type: '',
    field: '',
    message: '',
    status: 0,
  };

  queryGetRowsLimit((err, result) => {
    if (!err) {
      callback(null, 200, result)
    } else {
      error.type = ErrorTypes.InternalServerError;
      error.message = err.message;
      error.status = 500;
      callback(error, error.status, null);
    }
  }, table, limit, offset)
}
