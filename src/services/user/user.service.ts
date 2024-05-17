import { Model, FilterQuery, CreateQuery } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.schema';
import { RegisterUserInput } from './user.input';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
  ) {}

  async registerUser(input: CreateQuery<RegisterUserInput>): Promise<User> {
    return this.userModel.create(input);
  }
}
