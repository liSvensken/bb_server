import { MysqlError } from 'mysql';
import { ServiceModel } from '../../../models/service/service.model';
import { connection } from '../../../services/db.service';
import { UserDbModel } from '../../../models/user/user-db.model';
import { CityModel } from '../../../models/city/city.model';

export const queryGetRowsByField =
    (callback: (err: MysqlError | null, result: UserDbModel[] | ServiceModel[] | CityModel[]) => void,
                                   table: string, condition: string) => {
  connection.query(`SELECT * FROM timetable.${ table } WHERE ${ condition }`,
      (err, result: UserDbModel[] | ServiceModel[] | CityModel[]) => {
        callback(err, result);
      });
}
