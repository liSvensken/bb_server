import { MysqlError } from 'mysql';
import { connection } from '../../../services/db.service';
import { ServiceModel } from '../../../models/service/service.model';

export const queryDeleteRowOnField = (callback: (err: MysqlError | null, result: any[]) => void,
                                      table: string, condition: string) => {
  connection.query(`DELETE FROM timetable.${ table } WHERE ${ condition }`,
      (err, result: ServiceModel[]) => {
        callback(err, result);
      });
}
