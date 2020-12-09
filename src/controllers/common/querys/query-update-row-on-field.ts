import { MysqlError } from 'mysql';
import { connection } from '../../../services/db.service';

export const queryUpdateRowOnField = (callback: (err: MysqlError | null, result: any) => void,
                                      tableName: string, updateFieldStr: string, attrFieldName: string, attrField: string) => {
  console.log(`UPDATE timetable.${ tableName } SET ${ updateFieldStr } WHERE ${ attrFieldName } = ${ attrField }`)
  connection.query(`UPDATE timetable.${ tableName } SET ${ updateFieldStr } WHERE ${ attrFieldName } = ${ attrField }`,
      (err, result: any) => {
        callback(err, result);
      })
}
