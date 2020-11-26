import mysql, { Connection } from 'mysql';

export let connection: Connection;

export function initConnection(): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'password'
      });

      connection.connect(((err: string) => {
        if (!err) {
          console.log('DB connected');
          resolve();
        } else {
          reject(err);
        }
      }));
    } catch (err) {
      reject(err);
    }
  });
}
