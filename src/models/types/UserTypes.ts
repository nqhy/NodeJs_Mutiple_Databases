import { Document } from 'mongoose';

export type Role = 'admin' | 'hr' | 'guess' | 'member';

interface FullName {
  first: string;
  last: string;
}

interface Address {
  code: string;
  homeAddress: string;
}

export interface IUser extends Document {
  fullName: FullName;
  email: string;
  password: string;
  phone: string;
  role: Role;
  address?: Address;
  avatar?: string;
}
