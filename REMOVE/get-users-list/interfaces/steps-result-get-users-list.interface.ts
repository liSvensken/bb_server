import { UserDbModel } from '../../../src/models/user/user-db.model';
import { UserResponseModel } from '../../../src/models/user/user-response.model';
import { GetUsersListResponse } from './get-users-list-response.interface';

export interface StepsResultGetUsersList {
  step1GetUsersFromDb?: UserDbModel[];
  step2TransformUsersInResponse?: GetUsersListResponse;
  step5GetTotalItems?: number;
}
