import { ErrorInterface } from '../../../utils/errors/error.interface';

export interface CommonResponse {
  result?: [];
  token: string;
  error?: ErrorInterface;
  totalItems?: number;
}
