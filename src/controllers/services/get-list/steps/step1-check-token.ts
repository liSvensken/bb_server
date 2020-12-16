import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { getUserIdByToken } from '../../../common/steps/get-user-id-by-token';

export const step1CheckToken = (callback: (err: ErrorInterface, statusCode: number) => void,
                                token: string) => {
  getUserIdByToken((err, statusCode) => {
    if (!err) {
      callback(null, statusCode)
    } else {
      callback(err, statusCode)
    }
  }, token)
}
