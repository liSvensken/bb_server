import { Request, Response } from 'express';
import { connection } from '../../services/db.service';

export function userPutController(req: Request, res: Response) {
  const response = {
    error: null,
    result: null
  };

  let fieldReplace;

  if (req.body.name) {
    fieldReplace = `name = '${ req.body.name }'`;
  } else {
    fieldReplace = `name = null`
  }

  if (req.body.age) {
    fieldReplace += `, age = '${ req.body.age }'`
  } else {
    fieldReplace += `, age = null`
  }

  if (req.body.birth) {
    fieldReplace += `, birth = '${ req.body.birth }'`
  } else {
    fieldReplace += `, birth = null`
  }

  if (fieldReplace) {
    connection.query(`UPDATE itproger.users SET ${ fieldReplace } WHERE id = ${ req.params.id }`,
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
}


