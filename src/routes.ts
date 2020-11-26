import { Request, Response } from 'express';
import { app } from './services/app.service';
import { usersGetListController } from './controllers/users/users-get-list.controller';
import { userGetController } from './controllers/users/user-get.controller';
import { userPostController } from './controllers/users/user-post.controller';
import { userDeleteController } from './controllers/users/user-delete.controller';
import { userPatchController } from './controllers/users/user-patch-controller';
import { userPutController } from './controllers/users/user-put-controller';

export function initRoutes(): void {
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
    userDeleteController(req,res);
  });

  app.patch('/users/:id', (req: Request, res: Response) => {
    userPatchController(req,res);
  });

  app.put('/users/:id', (req: Request, res: Response) => {
    userPutController(req,res);
  });
}
