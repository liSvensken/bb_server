import { ErrorInterface } from '../../../utils/errors/error.interface';
import { TOKENS_LIST } from '../../../../TOKENS_LIST';
import { GetUserByToken } from '../interfaces/get-user-by-token-response';
import { ErrorTypes } from '../../../utils/errors/error.types';

export const getUserIdByToken = (callback: (err: ErrorInterface, statusCode: number, result: GetUserByToken) => void,
                                 token: string) => {

  let error: ErrorInterface = {
    type: '',
    field: '',
    message: '',
    status: 0,
  };

  if (TOKENS_LIST[token]) {
    callback(null, 200, TOKENS_LIST[token]);
  } else {
    error.type = ErrorTypes.Forbidden;
    error.message = 'No access';
    error.status = 404;
    callback(error, error.status, null);
  }
}

