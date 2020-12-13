import { ErrorInterface } from '../../../utils/errors/error.interface';
import { ErrorTypes } from '../../../utils/errors/error.types';
const bcrypt = require('bcrypt');

export const comparePassword = (callback: (error: ErrorInterface, statusCode: number) => void,
                                password: string, passwordHash: string) => {

  let error: ErrorInterface = {
    type: '',
    field: '',
    message: '',
    status: 0,
  };

  bcrypt.compare(password, passwordHash, (err: any, result: boolean) => {
    if (result) {
      callback(null, 200)
    } else {
      error.type = ErrorTypes.Unauthorized;
      error.field = 'Unauthorized';
      error.message = 'Invalid login or password';
      error.status = 401;
      callback(error, error.status);
    }
  })
}
