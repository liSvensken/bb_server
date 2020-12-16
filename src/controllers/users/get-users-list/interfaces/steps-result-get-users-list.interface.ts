import { UserDbModel } from '../../../../models/user/user-db.model';
import { GetUsersListResponse } from './get-users-list-response.interface';
import { UserRole } from '../../../../types/user-role.type';

export interface StepsResultGetUsersList {
  step1GetUserIdByToken: number;
  step2GetRole: UserRole;
  step3GetUsersFromDb?: UserDbModel[];
  step3TransformUsersInResponse?: GetUsersListResponse;
  step7GetTotalItems?: number;
}
