import { Request, Response } from 'express';
import { connection } from '../../services/db.service';
import { ErrorInterface } from '../../utils/errors/error.interface';
import { ErrorTypes } from '../../utils/errors/error.types';
import { apiSend } from '../../utils/api/api';

export function userDeleteController(req: Request, res: Response) {
  let error: ErrorInterface = {
    type: '',
    field: '',
    message: '',
    status: 0,
  };
  console.log(req.params.id)
  connection.query(`DELETE FROM timetable.users WHERE id=${ req.params.id }`,
      (err, result) => {
        switch (true) {
          case !!(err):
            error.type = ErrorTypes.SqlError;
            error.message = err.message;
            error.status = 500;
            apiSend(res, error.status, result, error);
            break;

          case (!result.affectedRows):
            error.type = ErrorTypes.InvalidParam;
            error.field = 'userId';
            error.message = `the "${ error.field }" field does not exist`;
            error.status = 404;
            apiSend(res, error.status, result, error);
            break;

          default:
            apiSend(res, 200, result, error);
        }
      })
}
