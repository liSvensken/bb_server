import { UserDbModel } from '../user-db.model';

export function isUsersDb(param: any[]): param is UserDbModel[] {
  param.forEach(elem => {
    if (!((elem as UserDbModel).id) ||
        !((elem as UserDbModel).role) ||
        !((elem as UserDbModel).nickname) ||
        !((elem as UserDbModel).email) ||
        !((elem as UserDbModel).passwordHash) ||
        !((elem as UserDbModel).serviceIdsStr) ||
        !((elem as UserDbModel).cityId) ||
        !((elem as UserDbModel).lastsName) ||
        !((elem as UserDbModel).firsName) ||
        !((elem as UserDbModel).phone) ||
        !((elem as UserDbModel).gender) ||
        !((elem as UserDbModel).birthday) ||
        !((elem as UserDbModel).avatar) ||
        !((elem as UserDbModel).infoYourself) ||
        !((elem as UserDbModel).myMasterIdsStr) ||
        !((elem as UserDbModel).myClientIdsStr)) {
      return false;
    }
  })
  return true;
}
