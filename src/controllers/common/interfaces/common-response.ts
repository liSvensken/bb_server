import { ErrorInterface } from '../../../utils/errors/error.interface';

export interface CommonResponse {
  result: [] | null,
  error: ErrorInterface | null,
  totalItems?: number
}
