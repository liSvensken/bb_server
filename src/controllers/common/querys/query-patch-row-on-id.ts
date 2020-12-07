import { MysqlError } from 'mysql';
import { connection } from '../../../services/db.service';

export const queryPatchRowOnId = (callback: (err: MysqlError | null, result: any) => void,
                                  table: string, fields: string, id: string) => {
  connection.query(`UPDATE timetable.${ table } SET ${ fields } WHERE id = ${ id }`,
      (err, result: any) => {
        callback(err, result);
      })
}
