import { Exclude } from "class-transformer";

class User {
  id: string;
  name: string;
  email: string;

  @Exclude()
  password: string;

  avatarUrl: string;
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
}

export default User;