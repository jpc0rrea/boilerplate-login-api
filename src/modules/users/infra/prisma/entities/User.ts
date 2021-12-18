import { Exclude, Expose } from 'class-transformer';

@Expose()
class ExposedUser {
  id: string;
  name: string;
  email: string;

  @Exclude()
  password: string;

  avatarUrl: string | null;
  permissionLevel: number;

  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
}

export default ExposedUser;
