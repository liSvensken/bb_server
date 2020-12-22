import { UserDbEnum } from '../../../../enums/users/user-db.enum';
import { UserRole } from '../../../../types/user-role.type';

interface objectKeys {
  [key: string]: string | number | number[];
}

export interface QueryFieldInterface extends objectKeys {
  [UserDbEnum.Role]: UserRole,
  [UserDbEnum.Id]: number[],
  [UserDbEnum.CityId]: number
}
