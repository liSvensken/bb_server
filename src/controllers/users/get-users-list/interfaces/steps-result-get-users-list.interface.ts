import { UserDbModel } from '../../../../models/user/user-db.model';
import { UserResponseModel } from '../../../../models/user/user-response.model';
import { GetUsersListResponse } from './get-users-list-response.interface';
import { step5ParseClientIdsStrInResponse } from '../steps/step5-parse-client-ids-str-in-response';

export interface StepsResultGetUsersList {
  step1GetUsersFromDb?: UserDbModel[];
  step2TransformUsersInResponse?: GetUsersListResponse;
  step6GetTotalItems?: number;
}
