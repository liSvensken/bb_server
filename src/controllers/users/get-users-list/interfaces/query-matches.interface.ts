import { UserDbEnum } from '../../../../enums/users/user-db.enum';

interface objectKeys {
  [key: string]: string;
}

export interface QueryMatchesInterface extends objectKeys{
  [UserDbEnum.Nickname]: string,
  [UserDbEnum.LastsName]: string,
  [UserDbEnum.FirsName]: string
}
