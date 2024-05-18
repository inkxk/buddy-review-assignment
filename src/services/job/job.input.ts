import { Field, InputType } from "@nestjs/graphql";
import { MaxLength, IsNotEmpty, IsOptional, IsString, MinLength, IsBoolean } from "class-validator";

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
export class UserQueryJobInput {
  @Field()
  @IsString()
  @IsOptional()
  title: string;
}

@InputType()
export class CompanyQueryApplicantInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(24)
  @MaxLength(24)
  company_id: string;

  @Field()
  @IsString()
  @IsOptional()
  @MinLength(24)
  @MaxLength(24)
  job_id: string;
}

@InputType()
export class CloseJobInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(24)
  @MaxLength(24)
  job_id: string;
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
  @IsBoolean()
  application_status: boolean;
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