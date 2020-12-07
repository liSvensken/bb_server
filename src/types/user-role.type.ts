export const UserRoleType = {
  CLIENT: 'CLIENT',
  MASTER: 'MASTER'
} as const;
export type UserRole = typeof UserRoleType[keyof typeof UserRoleType];
