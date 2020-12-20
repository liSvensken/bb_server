import { UserDbModel } from '../../../../models/user/user-db.model';
import { GetUsersListResponse } from './get-users-list-response.interface';
import { UserRole } from '../../../../types/user-role.type';

export interface StepsResultGetUsersList {
  step1GetUserIdByToken: number;
  step2GetCurrentUserRole: UserRole;
  step3GetUsersFromDb?: UserDbModel[];
  step4TransformUsersDbInResponse?: GetUsersListResponse;
  step8GetTotalItems?: number;
}
