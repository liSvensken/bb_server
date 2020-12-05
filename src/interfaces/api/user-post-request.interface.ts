import { UserRole } from '../../enums/user.role';
import { UserGender } from '../../enums/user.gender';

export interface UserPostRequest {
  id: number;
  role: UserRole;
  nickname: string;
  email: string;
  lastsName?: string;
  firsName?: string;
  serviceIds?: number[];
  cityId?: number[];
  phone?: string;
  gender?: UserGender;
  birthday?: string;
  avatar?: string;
  infoYourself?: string;
}
