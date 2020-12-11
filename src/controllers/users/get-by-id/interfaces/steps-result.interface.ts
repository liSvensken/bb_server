import { UserDbModel } from '../../../../models/user/user-db.model';
import { UserResponseModel } from '../../../../models/user/user-response.model';
import { GetServiceResponse } from './get-user-response.interface';

export interface StepsResultGetUser {
  step1GetUserFromDb: UserDbModel[];
  step2ParseInUserResponse: GetServiceResponse,
}
