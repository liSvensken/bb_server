import { ErrorInterface } from '../../../utils/errors/error.interface';
import { ErrorTypes } from '../../../utils/errors/error.types';
import { TOKENS_LIST } from '../../../../TOKENS_LIST';

const jwt = require('jsonwebtoken');

export const createToken = (callback: (err: ErrorInterface, statusCode: number, token: string) => void,
                            id: number) => {

  let error: ErrorInterface = {
    type: '',
    field: '',
    message: '',
    status: 0,
  };

  // создаём token = { 'шифр_токена': {id: 201} } и добавляем в TOKENS_LIST
  jwt.sign({ id }, 'secretKay', (err: any, token: string) => {

    if (!err) {
      TOKENS_LIST[token] = {
        id: id
      }
      callback(null, 200, token);
    } else {
      error.type = ErrorTypes.InternalServerError;
      error.field = 'token';
      error.message = err;
      error.status = 500;
      callback(err, error.status, null);
    }
  })
}
