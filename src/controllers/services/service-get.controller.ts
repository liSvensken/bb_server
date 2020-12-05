import { Request, Response } from 'express';
import { connection } from '../../services/db.service';
import { ErrorInterface } from '../../utils/api/interfaces/error.interface';
import { ErrorTypes } from '../../utils/api/enums/error-types.enum';
import { apiSend } from '../../utils/api/api';

export function serviceGetController(req: Request, res: Response) {
  let error: ErrorInterface = {
    type: '',
    field: '',
    message: '',
    status: 0,
  };

  connection.query(`SELECT * FROM timetable.services WHERE id=${ req.params.id }`,
      (err, result) => {
        switch (true) {
          case !!(err):
            error.type = ErrorTypes.SqlError;
            error.message = err.message;
            error.status = 500;
            apiSend(res, error.status, result, error);
            break;

          case (!result):
            error.type = ErrorTypes.InvalidParam;
            error.field = 'serviceId';
            error.message = `the ${ error.field } field does not exist`;
            error.status = 404;
            apiSend(res, error.status, result, error);
            break;

          default:
            apiSend(res, 200, result, error);
        }
      });
}
