import { UserDbModel } from '../../../../models/user/user-db.model';
import { UserResponseModel } from '../../../../models/user/user-response.model';

export interface StepsResultGetUser {
  step1GetUserFromDb: UserDbModel[];
  step2ParseInUserResponse: UserResponseModel[],
}
