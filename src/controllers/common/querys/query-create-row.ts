import { MysqlError } from 'mysql';
import { connection } from '../../../services/db.service';

export const queryCreateRow = (callback: (err: MysqlError | null, result: any) => void,
                               table: string, fields: string, values: string) => {
  connection.query(`
    INSERT INTO timetable.${ table }(${ fields }) VALUES (${ values })`,
      (err, result: any) => {
        callback(err, result);
      })
}
