import { UserDbEnum } from '../../enums/users-table/user-request.enum';

export const UserFieldsLength = {
  [UserDbEnum.Nickname]: {
    min: 3,
    max: 30
  },

  [UserDbEnum.Email]: {
    min: 5,
    max: 255
  },

  [UserDbEnum.LastsName]:  {
    min: 2,
    max: 45
  },

  [UserDbEnum.FirsName]: {
    min: 2,
    max: 45
  },

  [UserDbEnum.ServiceIds]: {
    max: 3
  },

  [UserDbEnum.CityIds]: {
    max: 3
  },

  [UserDbEnum.Birthday]: {
    max: 11
  },

  [UserDbEnum.Avatar]: {
    max: 255
  },

  [UserDbEnum.InfoYourself]: {
    max: 3000
  },
}
