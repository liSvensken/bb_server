export const UserRole = {
  CLIENT: 'CLIENT',
  MASTER: 'MASTER'
} as const;
export type UserRole = typeof UserRole[keyof typeof UserRole];
