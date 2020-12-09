import { UserRole } from '../../../types/user-role.type';
import { UserGender } from '../../../types/user-gender.type';

export interface UserConstFields {
  role: UserRole;
  nickname: string;
  email: string;
  lastsName?: string;
  firsName?: string;
  phone?: string;
  gender?: UserGender;
  birthday?: string;
  avatar?: string;
  infoYourself?: string;
}
