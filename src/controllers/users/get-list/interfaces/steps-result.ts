import { UserDbModel } from '../../../../models/user/user-db.model';
import { UserResponseModel } from '../../../../models/user/user-response.model';
import { ServiceModel } from '../../../../models/service/service.model';
import { CityModel } from '../../../../models/city/city.model';

export interface StepsResult {
  step1GetUsersFromDb?: UserDbModel[];
  step2ParseUsersInResponse?: UserResponseModel[];
  step5GetTotalItems?: number;
}
