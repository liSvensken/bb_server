import { connection } from '../../../services/db.service';
import { MysqlError } from 'mysql';
import { UserDbModel } from '../../../models/user/user-db.model';

export const queryGetRowsByFieldLimit =
    (callback: (err: MysqlError | null, result: UserDbModel[]) => void,
     table: string, condition: string, limit: number, offset: number) => {

      connection.query(`SELECT * FROM timetable.${ table } WHERE ${ condition } LIMIT ${ offset }, ${ limit }`,
          (err, result) => {
            callback(err, result)
          });
    }
