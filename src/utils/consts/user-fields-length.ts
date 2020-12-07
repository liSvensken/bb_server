import { UserRequestEnum } from '../../enums/user-request.enum';

export const UserFieldsLength = {
  [UserRequestEnum.Nickname]: {
    min: 3,
    max: 30
  },

  [UserRequestEnum.Email]: {
    min: 5,
    max: 255
  },

  [UserRequestEnum.LastsName]:  {
    min: 2,
    max: 45
  },

  [UserRequestEnum.FirsName]: {
    min: 2,
    max: 45
  },

  [UserRequestEnum.ServiceIds]: {
    max: 3
  },

  [UserRequestEnum.CityIds]: {
    max: 3
  },

  [UserRequestEnum.Birthday]: {
    max: 11
  },

  [UserRequestEnum.Avatar]: {
    max: 255
  },

  [UserRequestEnum.InfoYourself]: {
    max: 3000
  },
}
