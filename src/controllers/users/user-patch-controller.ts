import { Request, Response } from 'express';
import { connection } from '../../services/db.service';

export function userPatchController(req: Request, res: Response) {
  const response = {
    error: null,
    result: null
  };

  let fieldReplace = '';

  if (req.body.name) {
    if (fieldReplace) {
      fieldReplace += `, name = '${ req.body.name }'`
    } else {
      fieldReplace = `name = '${ req.body.name }'`
    }
  }

  if (req.body.email) {
    if (fieldReplace) {
      fieldReplace += `, email = '${ req.body.email }'`
    } else {
      fieldReplace = `email = '${ req.body.email }'`
    }
  }

  if (req.body.services) {
    if (fieldReplace) {
      fieldReplace += `, services = '${ req.body.services }'`
    } else {
      fieldReplace = `services = '${ req.body.services }'`
    }
  }

  if (fieldReplace) {
    connection.query(`UPDATE timetable.users SET ${ fieldReplace } WHERE id = ${ req.params.id }`,
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


