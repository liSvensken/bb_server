import { Request, Response } from 'express';
import { app } from './services/app.service';
import { usersGetListController } from './controllers/users/users-get-list.controller';
import { userGetController } from './controllers/users/user-get.controller';
import { userPostController } from './controllers/users/user-post.controller';
import { userDeleteController } from './controllers/users/user-delete.controller';
import { userPatchController } from './controllers/users/user-patch-controller';
import { servicesGetListController } from './controllers/services/services-get-list.controller';
import { servicePostController } from './controllers/services/service-post.controller';
import { serviceGetController } from './controllers/services/service-get.controller';
import { connection } from './services/db.service';

export function initRoutesUsers(): void {
  app.get('/users', (req: Request, res: Response) => {
    usersGetListController(req, res);
  });

  app.get('/users/:id', (req: Request, res: Response) => {
    userGetController(req, res);
  });

  app.post('/users/create', (req: Request, res: Response) => {
    userPostController(req, res);
  })

  app.delete('/users/:id', (req: Request, res: Response) => {
    userDeleteController(req, res);
  });

  app.patch('/users/:id', (req: Request, res: Response) => {
    userPatchController(req, res);
  });
}

export function initRoutesServices() {
  app.get('/services', (req: Request, res: Response) => {
    servicesGetListController(req, res);
  });

  app.get('/services/:id', (req: Request, res: Response) => {
    serviceGetController(req, res);
  });

  app.post('/services/create', (req: Request, res: Response) => {
    servicePostController(req, res);
  })
}

export function test() {
  app.get('/test/:id', (req: Request, res: Response) => {
    const response = {
      error: null,
      result: null
    };

    const queryServices = `
    SELECT timetable.users.services, timetable.services.serviceName FROM timetable.users 
    INNER JOIN timetable.services
    ON timetable.users.services = timetable.services.id
    `

    connection.query(queryServices ,
        (err, result) => {
          console.log(result);
          if (!err) {
            res.status(200);
            response.result = result;
          } else {
            res.status(400);
            response.error = null;
          }

          res.json(response);
        });
  });
}
