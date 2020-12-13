import { UserRole } from '../../../../types/user-role.type';

export interface UserRegistrationResponse {
  id: number;
  role: UserRole;
  nickname: string;
}
