import { UserConstFields } from './common/user-const-fields.interface';
import { ServiceModel } from '../service/service.model';
import { CityModel } from '../city/city.model';

export interface UserResponseModel extends UserConstFields {
  id: number;
  services?: ServiceModel[];
  city?: CityModel;
  myMasters?: UserResponseModel[];
  myClients?: UserResponseModel[];
}
