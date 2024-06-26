import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { LoginUserInput, RegisterUserInput } from './user.input';
import { UserService } from './user.service';
import { User } from './user.schema';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => User)
  async registerUser(@Args('input') input: RegisterUserInput) {
    return this.userService.registerUser(input);
  }

  @Mutation(() => User)
  async loginUser(@Args('input') input: LoginUserInput) {
    return this.userService.loginUser(input);
  }
}
