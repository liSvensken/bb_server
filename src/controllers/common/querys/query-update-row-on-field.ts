import { MysqlError } from 'mysql';
import { connection } from '../../../services/db.service';
import { SqlResult } from '../interfaces/sql-result.interface.';

export const queryUpdateRowOnField = (callback: (err: MysqlError | null, result: SqlResult) => void,
                                      tableName: string, updateFieldStr: string, attrFieldName: string, attrField: string) => {
  console.log(`UPDATE timetable.${ tableName } SET ${ updateFieldStr } WHERE ${ attrFieldName } = ${ attrField }`)
  connection.query(`UPDATE timetable.${ tableName } SET ${ updateFieldStr } WHERE ${ attrFieldName } = ${ attrField }`,
      (err, result: SqlResult) => {
        callback(err, result);
      })
}
