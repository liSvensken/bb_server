import { Request, Response } from 'express';
import { app } from './services/app.service';
import { getListController } from './controllers/users/get-list/get-list.controller';
import { userGetController } from './controllers/users/user-get.controller';
import { registrationController } from './controllers/users/registration/registration.controller';
import { userDeleteController } from './controllers/users/user-delete.controller';
import { update } from './controllers/users/update/update';
import { getById } from './controllers/services/get-by-id/get-by-id';

export function initRoutesUsers(): void {
  app.post('/users', (req: Request, res: Response) => {
    getListController(req, res);
  });

  app.get('/users/:id', (req: Request, res: Response) => {
    // userGetController(req, res);
  });

  app.post('/users/create', (req: Request, res: Response) => {
    registrationController(req, res);
  })

  app.delete('/users/:id', (req: Request, res: Response) => {
    // userDeleteController(req, res);
  });

  app.patch('/users/:id', (req: Request, res: Response) => {
    update(req, res);
  });
}

export function initRoutesServices() {
  app.get('/services', (req: Request, res: Response) => {
    // servicesGetListController(req, res);
  });

  app.get('/services/:id', (req: Request, res: Response) => {
    getById(req, res);
  });
}
