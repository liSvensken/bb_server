import { MysqlError } from 'mysql';
import { connection } from '../../../services/db.service';

export const queryCountRows = (callback: (err: MysqlError | null, result: number) => void,
                               table: string, fieldName: string) => {
  connection.query(`SELECT COUNT(${ fieldName }) FROM timetable.${ table }`,
      (err, result) => {
        result = result ? result[0]['COUNT(id)'] : null;
        callback(err, result);
      });
}
