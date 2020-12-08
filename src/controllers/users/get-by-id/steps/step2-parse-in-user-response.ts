import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { UserDbModel } from '../../../../models/user/user-db.model';
import { parseUserDb } from '../../../common/steps/user/parse-user-db';
import { UserResponseModel } from '../../../../models/user/user-response.model';

export const step2ParseInUserResponse = (callback: (err: ErrorInterface, statusCode: number, result?: UserResponseModel[]) => void,
                                         usersDb: UserDbModel[]) => {
  parseUserDb(callback, usersDb);
}
