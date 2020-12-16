import { GetRequest } from '../../../common/interfaces/get-request.interface';
import { UserRole } from '../../../../types/user-role.type';

export interface GetMastersListRequest extends GetRequest {
  role: UserRole
}
