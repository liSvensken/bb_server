export const UserGenderType = {
  MAN: 'MAN',
  WOMAN: 'WOMAN'
} as const;
export type UserGender = typeof UserGenderType[keyof typeof UserGenderType];

