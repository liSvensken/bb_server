import { ErrorInterface } from '../../../utils/errors/error.interface';
import { ErrorTypes } from '../../../utils/errors/error.types';
const bcrypt = require('bcrypt');

export const hashPassword = (callback: (err: ErrorInterface, statusCode: number, result: string) => void,
                             password: string) => {
  let error: ErrorInterface = {
    type: '',
    field: '',
    message: '',
    status: 0,
  };

  bcrypt.hash(password, 10 , (err: any, hashPassword: string ) => {
    if (!err) {
      callback(null, 200, hashPassword);
    } else {
      error.type = ErrorTypes.InternalServerError;
      error.message = 'password hashing error';
      error.status = 500;
    }
  }) ;
}
