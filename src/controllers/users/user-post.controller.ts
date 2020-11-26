import { Request, Response } from 'express';
import { connection } from '../../services/db.service';

export function userPostController(req: Request, res: Response) {
  const response = {
    error: null,
    result: null
  };
  const body = req.body;
  connection.query(
      `INSERT INTO itproger.users(name, age, birth) VALUES ('${ body.name }', '${ body.age }', '${ body.birth }')`,
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
