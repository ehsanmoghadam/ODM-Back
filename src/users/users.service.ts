import { Injectable } from '@nestjs/common';
import { IUser } from './users.interface';

@Injectable()
export class UsersService {
  private readonly users: IUser[] = [
    {
      email: 'admin@gmail.com',
      name: 'Admin Name',
      password: 'admin',
    },
  ];

  async findOne(email: string): Promise<IUser | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<IUser | undefined> {
    const user = this.users.find(
      (user) => user.email === email && user.password === password,
    );
    if (user) {
      return { ...user, password: undefined };
    }
    return undefined;
  }
}
