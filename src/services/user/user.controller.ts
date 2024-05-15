import { Body, Controller, Get, Post } from "@nestjs/common";
import { RegisterUserInput } from "./user.input";
import { UserService } from "./user.service";

@Controller("/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    const users = await this.userService.find();
    return { users };
  }

  @Post("/register")
  async registerUser(@Body() data: RegisterUserInput) {    
    const user = await this.userService.registerUser(data);
    return { user };
  }
}
