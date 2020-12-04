// import { Request, Response } from 'express';
// import { connection } from '../../services/db.service';
//
// export function userPutController(req: Request, res: Response) {
//   const response = {
//     error: null,
//     result: null
//   };
//
//   let fieldReplace;
//
//   if (!req.body.services) {
//     req.body.name = null;
//   }
//
//   if (fieldReplace) {
//     connection.query(`UPDATE timetable.users SET ${ fieldReplace } WHERE id = ${ req.params.id }`,
//         (err, result) => {
//           if (!err) {
//             res.status(200);
//             response.result = result;
//           } else {
//             res.status(400);
//             response.error = null;
//           }
//
//           res.json(response);
//         });
//   }
// }
//
//
