import { Field, ObjectType } from "@nestjs/graphql";
import * as mongoose from "mongoose";
import { Document } from "mongoose";

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, required: true },
});

@ObjectType()
export class User extends Document {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  type: string;
}
