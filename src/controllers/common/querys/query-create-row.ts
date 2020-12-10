import { MysqlError } from 'mysql';
import { connection } from '../../../services/db.service';
import { SqlResult } from '../interfaces/sql-result.interface.';

export const queryCreateRow = (callback: (err: MysqlError | null, result: SqlResult) => void,
                               tableName: string, fields: string, values: string) => {
  connection.query(`INSERT INTO timetable.${ tableName }(${ fields }) VALUES (${ values })`,
      (err, result: SqlResult) => {
        callback(err, result);
      })
}
