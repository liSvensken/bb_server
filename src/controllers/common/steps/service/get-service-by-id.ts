import { ServiceModel } from '../../../../models/service/service.model';
import { queryGetRowOnField } from '../../querys/query-get-row-on-field';
import { ErrorTypes } from '../../../../utils/errors/error.types';
import { ErrorInterface } from '../../../../utils/errors/error.interface';
import Table = WebAssembly.Table;
import { TablesEnum } from '../../../../enums/tables-name.enum';

export const getServiceById = (callback: (err: ErrorInterface, statusCode: number, result: ServiceModel[]) => void,
                               id: number[]) => {
  let error: ErrorInterface = {
    type: '',
    field: '',
    message: '',
    status: 0,
  };

  queryGetRowOnField((err, result) => {
    if (!err) {
      callback(null, 200, result);
    } else {
      error.type = ErrorTypes.SqlError;
      error.message = err.message;
      error.status = 500;
      callback(error, error.status, null);
    }
  }, TablesEnum.Services, `id = ${ id }`);
}
