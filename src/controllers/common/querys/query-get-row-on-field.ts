import { MysqlError } from 'mysql';
import { ServiceModel } from '../../../models/service/service.model';
import { connection } from '../../../services/db.service';

export const queryGetRowOnField = (callback: (err: MysqlError | null, result: any[]) => void,
                                   table: string, condition: string) => {
  connection.query(`SELECT * FROM timetable.${ table } WHERE ${ condition }`,
      (err, result: ServiceModel[]) => {
        callback(err, result);
      });
}
