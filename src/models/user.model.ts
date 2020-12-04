import { ServiceModel } from './service.model';
import { CityModel } from './city.model';
import { UserRole } from '../enums/user-role';

export interface UserModel {
  id: number;
  role: UserRole;
  nickname: string;
  email: string;
  lastsName?: string;
  firsName?: string;
  services?: ServiceModel[]; // ссылка на services [{id, name}, {id, name}]
  city?: CityModel; // ссылка на city {id, name}
  phone?: string;
  gender?: string;
  birthday?: string;
  avatar?: string;
  infoYourself?: string;
}
