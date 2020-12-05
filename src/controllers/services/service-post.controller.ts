// import { Request, Response } from 'express';
// import { connection } from '../../services/db.service';
// import { ErrorInterface } from '../../utils/api/interfaces/error.interface';
//
// export function servicePostController(req: Request, res: Response) {
//   let error: ErrorInterface = {
//     type: '',
//     field: '',
//     message: '',
//     status: 0,
//   };
//
//   connection.query(`INSERT INTO timetable.service (name) VALUES ('${ req.body.name }')`,
//       (err, result) => {
//         if (!err) {
//           res.status(200);
//           response.result = result;
//         } else {
//           res.status(400);
//           response.error = null;
//         }
//
//         res.json(response);
//       });
// }
