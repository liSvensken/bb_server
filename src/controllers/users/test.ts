// import { Request, Response } from 'express';
// import { connection } from '../../services/db.service';
// import { ServiceModelInterface } from '../../interfaces/serviceModel';
//
// export function userPostController(req: Request, res: Response) {
//   let response: { error: {} | null, result: {} | null } = {
//     error: null,
//     result: null
//   };
//
//   let isValid = true;
//   let services: ServiceModelInterface[] | null;
//
//   const q1 = (callback: (err: any, result: any) => void) => {
//     connection.query(`SELECT * FROM timetable.services WHERE  ${ servicesQuery }`,
//         (err, result: ServiceModelInterface[]) => {
//           callback(err, result);
//         })
//   }
//
//   const q2 = (callback: (err: any, result: any) => void) => {
//     connection.query(`SELECT * FROM timetable.services WHERE  ${ servicesQuery }`,
//         (err, result: ServiceModelInterface[]) => {
//           callback(err, result);
//         })
//   }
//
//   q1((err, result) => {
//     if (!err) {
//
//       q2((err, result) => {
//         if (!err) {
//
//         } else {
//
//         }
//       })
//     } else {
//
//     }
//   })
//
//   const q1 = (callback: (err: any, result: any) => void) => {
//     if (req.body.services) {
//       let servicesQuery = '';
//       Object.keys(req.body.services).forEach(elem => {
//         if (!servicesQuery) {
//           servicesQuery = `id = ${ req.body.services[elem] }`;
//         } else {
//           servicesQuery += ` OR id = ${ req.body.services[elem] }`
//         }
//       });
//
//       connection.query(`SELECT * FROM timetable.services WHERE  ${ servicesQuery }`,
//           (err, result: ServiceModelInterface[]) => {
//             console.log(1)
//             if (result.length === req.body.services.length) {
//               services = result;
//             } else {
//               res.status(406);
//               response.error = 'Invalid services data';
//               isValid = false;
//             }
//           })
//     } else {
//       services = null;
//     }
//   }
//
//   if (isValid) {
//     // const queryStr = `INSERT INTO timetable.users(role, services, name, email) VALUES
//     //     ('${ req.body.role }', ${JSON.stringify(services)}, '${ req.body.name }', '${ req.body.email }')`;
//     //
//     // connection.query(queryStr, (err, result) => {
//     //   console.log(servicesIds)
//     //   if (!err) {
//     //     res.status(200);
//     //     response.result = result;
//     //     // console.log(typeof response.result.services)
//     //     // response.result.services = services;
//     //   } else {
//     //     res.status(400);
//     //     response.error = err;
//     //   }
//     //
//     //   res.json(response);
//     // });
//   }
// }
