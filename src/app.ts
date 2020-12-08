import { initApp, startApp } from './services/app.service';
import { initConnection } from './services/db.service';
import { initRoutesCities, initRoutesServices, initRoutesUsers } from './routes';

initApp();
initConnection()
    .then(() => {
      startApp(process.env.PORT || 3000);
      initRoutesUsers();
      initRoutesServices();
      initRoutesCities();
    })
    .catch(err => console.error(err));
