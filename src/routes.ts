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
import { authorizationController } from './controllers/users/authorization/authorization.controller';
import { getUserByToken } from './controllers/users/get-by-token/get-user-by-token';

export function initRoutesUsers(): void {
  // получить список users
  app.post('/users', (req: Request, res: Response) => {
    getUsersListController(req, res);
  });

  // получить user-а по id
  app.get('/users/:id', (req: Request, res: Response) => {
    getUserByIdController(req, res);
  });

  // добавить user-а по токену
  app.get('/user/token', (req: Request, res: Response) => {
    getUserByToken(req, res);
  })

  // добавить user-а
  app.post('/users/create', (req: Request, res: Response) => {
    registrationController(req, res);
  })

  // авторизация user-а
  app.post('/users/auth', (req: Request, res: Response) => {
    authorizationController(req, res);
  })

  // удаление user-а
  app.delete('/users/:id', (req: Request, res: Response) => {
    deleteUserController(req, res);
  });

  // редактирование user-а
  app.patch('/users/:id', (req: Request, res: Response) => {
    updateUserController(req, res);
  });
}

export function initRoutesServices() {
  // получить список сервисы
  app.post('/services', (req: Request, res: Response) => {
    getServicesListController(req, res);
  });

  // получить сервис по id
  app.get('/services/:id', (req: Request, res: Response) => {
    getServiceByIdController(req, res);
  });
}

export function initRoutesCities() {
  // получить список городов
  app.post('/cities', (req: Request, res: Response) => {
    getCitiesListController(req, res);
  });

  // получить город по id
  app.get('/cities/:id', (req: Request, res: Response) => {
    getCityByIdController(req, res);
  });
}
