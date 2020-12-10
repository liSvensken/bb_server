import { ErrorInterface } from '../../../utils/errors/error.interface';

export interface CommonResponse<T> {
  result?: T;
  error?: ErrorInterface;
  totalItems?: number;
}
