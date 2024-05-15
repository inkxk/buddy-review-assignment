import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString, MinLength, Equals } from "class-validator";

@InputType()
export class RegisterUserInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @Equals("applicant" || "company")
  type: string;
}

@InputType()
export class LoginUserInput {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
