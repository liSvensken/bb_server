import { Request, Response } from 'express';
import { app } from './services/app.service';
import { getUsersListController } from './controllers/users/get-list/get-users-list.controller';
import { registrationController } from './controllers/users/registration/registration.controller';
import { updateUserController } from './controllers/users/update/update-user.controller';
import { getServicesListController } from './controllers/services/get-list/get-services-list.controllerts';
import { getUserByIdController } from './controllers/users/get-by-id/get-user-by-id.controller';
import { getServiceByIdController } from './controllers/services/get-by-id/get-service-by-id.controller';
import { deleteUserController } from './controllers/users/delete/delete-user.controller';
import { getCitiesListController } from './controllers/cities/get-list/get-cities-list.controllerts';
import { getCityByIdController } from './controllers/cities/get-by-id/get-city-by-id.controller';

export function initRoutesUsers(): void {
  app.post('/users', (req: Request, res: Response) => {
    getUsersListController(req, res);
  });

  app.get('/users/:id', (req: Request, res: Response) => {
    getUserByIdController(req, res);
  });

  app.post('/users/create', (req: Request, res: Response) => {
    registrationController(req, res);
  })

  app.delete('/users/:id', (req: Request, res: Response) => {
    deleteUserController(req, res);
  });

  app.patch('/users/:id', (req: Request, res: Response) => {
    updateUserController(req, res);
  });
}

export function initRoutesServices() {
  app.post('/services', (req: Request, res: Response) => {
    getServicesListController(req, res);
  });

  app.get('/services/:id', (req: Request, res: Response) => {
    getServiceByIdController(req, res);
  });
}

export function initRoutesCities() {
  app.post('/cities', (req: Request, res: Response) => {
    getCitiesListController(req, res);
  });

  app.get('/cities/:id', (req: Request, res: Response) => {
    getCityByIdController(req, res);
  });
}
