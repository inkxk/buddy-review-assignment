import { Field, ObjectType } from "@nestjs/graphql";
import * as mongoose from "mongoose";
import { Document } from "mongoose";

const applicantSchema = new mongoose.Schema({
  applicant_id: { type: mongoose.Schema.ObjectId, required: true },
  application_status: { type: Boolean, default : null },
});

export const JobSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: false },
  company_id: { type: mongoose.Schema.ObjectId, required: true },
  applicants: { type: [applicantSchema], required: true },
  is_deleted: { type: Boolean, default: false }
});

@ObjectType()
export class Applicant {
  @Field()
  applicant_id: string;

  @Field()
  application_status: boolean;
}

@ObjectType()
export class Job extends Document {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  company_id: string;

  @Field(() => [Applicant])
  applicants: [Applicant];

  @Field()
  is_deleted: boolean;
}
