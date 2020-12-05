export const User = {
  id: 'id',
  role: 'role',
  nickname: 'nickname',
  email: 'email',
  lastsName: 'lastsName',
  firsName: 'firsName',
  services: 'services',
  city: 'city',
  phone: 'phone',
  gender: 'gender',
  birthday: 'birthday',
  avatar: 'avatar',
  infoYourself: 'infoYourself',
} as const;
export type User = typeof User[keyof typeof User];
