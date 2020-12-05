import { Request, Response } from 'express';
import { connection } from '../../services/db.service';
import { apiSend } from '../../utils/api/api';
import { ErrorInterface } from '../../utils/api/interfaces/error.interface';
import { ErrorTypes } from '../../utils/api/enums/error-types.enum';

export function servicesGetListController(req: Request, res: Response) {
  let error: ErrorInterface = {
    type: '',
    field: '',
    message: '',
    status: 0,
  };

  connection.query(`SELECT * FROM timetable.services`,
      (err, result) => {
        if (!err) {
          apiSend(res, 200, result, error);
        } else {
          error.type = ErrorTypes.SqlError;
          error.message = err.message;
          error.status = 500;
          apiSend(res, error.status, result, error);
        }
      });
}
