import { initApp, startApp } from './services/app.service';
import { initConnection } from './services/db.service';
import { initRoutesServices, initRoutesUsers } from './routes';

initApp();
initConnection()
    .then(() => {
      startApp(process.env.PORT || 3000);
      initRoutesUsers();
      initRoutesServices();
    })
    .catch(err => console.error(err));
