import { connection } from '../../../services/db.service';
import { MysqlError } from 'mysql';
import { UserDbModel } from '../../../models/user/user-db.model';
import { ServiceModel } from '../../../models/service/service.model';
import { CityModel } from '../../../models/city/city.model';

export const queryGetRowList =
    (callback: (err: MysqlError | null, result: UserDbModel[] | ServiceModel[] | CityModel[]) => void,
                                 table: string, limit: number, offset: number) => {
  connection.query(`SELECT * FROM timetable.${ table } LIMIT ${ offset }, ${ limit }`,
      (err, result) => {
        callback(err, result)
      });
}
