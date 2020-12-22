import { GetRequest } from '../../../common/interfaces/get-request.interface';
import { UserRole } from '../../../../types/user-role.type';

export interface GetUsersListRequest extends GetRequest {
  onlyMy?: boolean;
  query?: string;
  service?: number;
  city?: number;
}
