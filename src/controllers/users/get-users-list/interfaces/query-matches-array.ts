import { UserDbEnum } from '../../../../enums/users/user-db.enum';

interface objectKeys {
  [key: string]: number;
}

export interface QueryMatchesArray extends objectKeys{
  [UserDbEnum.ServiceIdsStr]: number
}
