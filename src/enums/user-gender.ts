export const UserGender = {
  MAN: 'MAN',
  WOMAN: 'WOMAN'
} as const;
export type UserGender = typeof UserGender[keyof typeof UserGender];

