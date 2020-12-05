import { MysqlError } from 'mysql';
import { ServiceModel } from '../models/service.model';
import { connection } from './db.service';

export const queryGetRowOnField = (callback: (err: MysqlError | null, result: ServiceModel[]) => void,
                                   table: string, condition: string) => {
  connection.query(`SELECT * FROM timetable.${ table } WHERE ${ condition }`,
      (err, result: ServiceModel[]) => {
        callback(err, result);
      });
}

export const queryCreateRow = (callback: (err: MysqlError | null, result: any) => void,
                               table: string, fields: string, values: string) => {
  connection.query(`
    INSERT INTO timetable.${ table }(${ fields }) VALUES (${ values })`,
      (err, result: any) => {
        callback(err, result);
      })
}

export const queryPatchRowOnId = (callback: (err: MysqlError | null, result: any) => void,
                                  table: string, fields: string, id: string) => {
  connection.query(`UPDATE timetable.${ table } SET ${ fields } WHERE id = ${ id }`,
      (err, result: any) => {
        callback(err, result);
      })
}
