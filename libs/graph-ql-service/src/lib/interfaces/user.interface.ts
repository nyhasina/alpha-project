import { Profile } from './profile.interface';

export interface User {
  id?: number;
  email?: string;
  password?: string;
  profile?: Profile;
}
