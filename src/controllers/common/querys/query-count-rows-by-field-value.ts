import { MysqlError } from 'mysql';
import { connection } from '../../../services/db.service';

export const queryCountRowsByFieldValue = (callback: (err: MysqlError | null, result: number) => void,
                                           table: string, field: string | number, fieldName: string) => {

  connection.query(`SELECT COUNT(case ${ fieldName } when '${ field }' then 1 else null end) FROM timetable.${ table }`,
      (err, result) => {
        result = result ? result[0][`COUNT(case ${ fieldName } when '${ field }' then 1 else null end)`] : null;
        callback(err, result);
      });
}

