import { MysqlError } from 'mysql';
import { connection } from '../../../services/db.service';
import { ServiceModel } from '../../../models/service/service.model';
import { SqlResult } from '../interfaces/sql-result.interface.';

export const queryDeleteRowByField = (callback: (err: MysqlError | null, result: SqlResult) => void,
                                      table: string, condition: string) => {
  connection.query(`DELETE FROM timetable.${ table } WHERE ${ condition }`,
      (err, result: SqlResult) => {
        callback(err, result);
      });
}
