import { UserDbModel } from '../../../../models/user/user-db.model';
import { UserResponseModel } from '../../../../models/user/user-response.model';
import { GetUsersListResponse } from './get-users-list-response.interface';

export interface StepsResultGetUsersList {
  step1GetUsersFromDb?: UserDbModel[];
  step2ParseUsersInResponse?: GetUsersListResponse;
  step5GetTotalItems?: number;
}
