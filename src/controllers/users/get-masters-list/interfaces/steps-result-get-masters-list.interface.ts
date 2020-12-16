import { UserDbModel } from '../../../../models/user/user-db.model';
import { UserResponseModel } from '../../../../models/user/user-response.model';
import { GetUsersListResponse } from './get-masters-list-response.interface';
import { step5ParseClientIdsStrInResponse } from '../steps/step5-parse-client-ids-str-in-response';

export interface StepsResultGetMastersList {
  step1GetMastersFromDb?: UserDbModel[];
  step2TransformMastersInResponse?: GetUsersListResponse;
  step6GetTotalItems?: number;
}
