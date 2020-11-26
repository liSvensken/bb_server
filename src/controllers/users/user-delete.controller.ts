import { Request, Response } from 'express';
import { connection } from '../../services/db.service';

export function userDeleteController(req: Request, res: Response) {
  const response = {
    error: null,
    result: null
  };

  connection.query(`DELETE FROM itproger.users WHERE id=${ req.params.id }`,
      (err, result) => {
        if (!err) {
          res.status(200);
          response.result = result;
        } else {
          res.status(400);
          response.error = null;
        }

        res.json(response);
      });
}
