import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { UserDbModel } from '../../../../models/user/user-db.model';
import { getUsersFromDbAndParse } from './test/get-users-from-db-and-parse';

export const step1GetUsers = (callback: (err: ErrorInterface, statusCode: number, result?: UserDbModel[]) => void,
                              limit: number, offset: number) => {
  getUsersFromDbAndParse((err, statusCode, result) => {
    if (!err) {
      console.log(3)
      callback(null, 200, result)
    } else {
      callback(err, statusCode, null);
    }
  }, limit, offset)
}
