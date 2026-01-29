import { IUser } from '@libs/shared';

export const UserCreateFields = ['name', 'email', 'password'] as const;
export type UserCreateInterface = Pick<IUser, (typeof UserCreateFields)[number]>;
