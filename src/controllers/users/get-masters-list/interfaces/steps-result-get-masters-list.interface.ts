import { UserDbModel } from '../../../../models/user/user-db.model';
import { UserResponseModel } from '../../../../models/user/user-response.model';
import { GetUsersListResponse } from './get-masters-list-response.interface';

export interface StepsResultGetMastersList {
  step1GetMastersFromDb?: UserDbModel[];
  step2ParseMastersInResponse?: GetUsersListResponse;
  step5GetTotalItems?: number;
}
