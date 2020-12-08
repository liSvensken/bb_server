import { connection } from '../../../services/db.service';
import { MysqlError } from 'mysql';
import { UserDbModel } from '../../../models/user/user-db.model';

export const queryGetRowList = (callback: (err: MysqlError | null, result: any[]) => void,
                                 table: string, limit: number, offset: number) => {
  connection.query(`SELECT * FROM timetable.${ table } LIMIT ${ offset }, ${ limit }`,
      (err, result) => {
        callback(err, result)
      });
}
