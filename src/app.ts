import { initApp, startApp } from './services/app.service';
import { initConnection } from './services/db.service';
import { initRoutes } from './routes';

initApp();
initConnection()
    .then(() => {
      startApp(process.env.PORT || 3000);
      initRoutes();
    })
    .catch(err => console.error(err));
