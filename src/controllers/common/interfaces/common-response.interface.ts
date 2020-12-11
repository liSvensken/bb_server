import { ErrorInterface } from '../../../utils/errors/error.interface';

export interface CommonResponse {
  result?: [];
  error?: ErrorInterface;
  totalItems?: number;
}
