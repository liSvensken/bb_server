import { initApp, startApp } from './services/app.service';
import { initConnection } from './services/db.service';
import { initRoutesServices, initRoutesUsers, test } from './routes';

initApp();
initConnection()
    .then(() => {
      startApp(process.env.PORT || 3000);
      initRoutesUsers();
      initRoutesServices();
      test();
    })
    .catch(err => console.error(err));
