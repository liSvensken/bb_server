import { UserConstFields } from './common/user-const-fields.interface';
import { ServiceModel } from '../service/service.model';
import { CityModel } from '../city/city.model';

export interface UserResponseModel extends UserConstFields {
  id: number;
  services?: ServiceModel[];
  cities?: CityModel[];
  myMasters?: UserResponseModel[];
  myClients?: UserResponseModel[];
}
