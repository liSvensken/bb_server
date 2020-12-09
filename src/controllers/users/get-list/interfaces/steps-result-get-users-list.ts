import { UserDbModel } from '../../../../models/user/user-db.model';
import { UserResponseModel } from '../../../../models/user/user-response.model';

export interface StepsResultGetUsersList {
  step1GetUsersFromDb?: UserDbModel[];
  step2ParseUsersInResponse?: UserResponseModel[];
  step5GetTotalItems?: number;
}
