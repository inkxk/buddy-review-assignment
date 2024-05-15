import { Field, InputType } from "@nestjs/graphql";
import { MaxLength, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

@InputType()
export class RegisterJobInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field()
  @IsOptional()
  @IsString()
  description: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(24)
  @MaxLength(24)
  company_id: string;
}

@InputType()
export class QueryJobInput {
  @Field()
  @IsString()
  @IsOptional()
  @MinLength(24)
  @MaxLength(24)
  job_id: string;
}

@InputType()
export class UpdateJobStatusInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(24)
  @MaxLength(24)
  job_id: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  job_status: string;
}

@InputType()
export class UpdateApplicantStatusInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(24)
  @MaxLength(24)
  job_id: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(24)
  @MaxLength(24)
  applicant_id: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  application_status: string;
}

@InputType()
export class ApplyJobInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(24)
  @MaxLength(24)
  job_id: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(24)
  @MaxLength(24)
  applicant_id: string;
}