import { Request, Response } from 'express';
import { app } from './services/app.service';
import { usersGetListController } from './controllers/users/users-get-list.controller';
import { userGetController } from './controllers/users/user-get.controller';
import { userPostController } from './controllers/users/user-post.controller';
import { userDeleteController } from './controllers/users/user-delete.controller';
import { userPatchController } from './controllers/users/user-patch-controller';
import { servicesGetListController } from './controllers/services/services-get-list.controller';
import { serviceGetController } from './controllers/services/service-get.controller';

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

  // не нужно
  // app.post('/services/create', (req: Request, res: Response) => {
  //   servicePostController(req, res);
  // })
}
