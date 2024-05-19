import { Body, Controller, Get, Post } from "@nestjs/common";
import { RegisterUserInput, LoginUserInput } from "./user.input";
import { UserService } from "./user.service";

@Controller("/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/register")
  async registerUser(@Body() data: RegisterUserInput) {    
    const user = await this.userService.registerUser(data);
    return { user };
  }

  @Post("/login")
  async loginUser(@Body() data: LoginUserInput) {    
    const accessToken = await this.userService.loginUser(data);
    return { accessToken };
  }
}
