import { Model, CreateQuery, FilterQuery } from "mongoose";
import { Injectable, Inject, NotFoundException, UnauthorizedException } from "@nestjs/common";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "./user.schema";
import { RegisterUserInput, LoginUserInput } from "./user.input";

@Injectable()
export class UserService {
  constructor(
    @Inject("USER_MODEL")
    private userModel: Model<User>,
  ) {}

  async registerUser(input: CreateQuery<RegisterUserInput>): Promise<User> {
    const hashedPassword = await bcrypt.hash(input.password, 10);
    input.password = hashedPassword;
    return this.userModel.create(input);
  }

  async loginUser(input: FilterQuery<LoginUserInput>): Promise<User> {
    const user = await this.userModel.findOne({ email: input.email });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    const match = await bcrypt.compare(input.password, user.password);
    if (!match) {
      throw new UnauthorizedException("Incorrect Password");
    }

    const accessToken = jwt.sign(
      JSON.stringify(user),
      process.env.TOKEN_SECRET,
    );

    return accessToken;
  }
}
