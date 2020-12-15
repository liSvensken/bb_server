import { UserDbModel } from '../../../../models/user/user-db.model';
import { UserResponseModel } from '../../../../models/user/user-response.model';
import { GetUsersListResponse } from './get-clients-list-response.interface';

export interface StepsResultGetClientsList {
  step1GetClientsFromDb?: UserDbModel[];
  step2ParseClientsInResponse?: GetUsersListResponse;
  step5GetTotalItems?: number;
}
