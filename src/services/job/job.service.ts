import { Model, FilterQuery, CreateQuery } from "mongoose";
import { Injectable, Inject } from "@nestjs/common";
import { Job } from "./job.schema";
import { User } from "../user/user.schema";
import { RegisterJobInput, ApplyJobInput } from "./job.input";

@Injectable()
export class JobService {
  constructor(
    @Inject("JOB_MODEL")
    private jobModel: Model<Job>,
    @Inject("USER_MODEL")
    private userModel: Model<User>,
  ) {}

  async registerJob(input: CreateQuery<RegisterJobInput>): Promise<Job> {
    const companyExists = await this.userModel.findOne({ _id: input.company_id, type: "company" }).exec();

    if (!companyExists) {
      throw new Error("Company not found");
    }
    return this.jobModel.create(input);
  }

  async applyJob(input: CreateQuery<ApplyJobInput>): Promise<Job> {
    return this.jobModel.findByIdAndUpdate(input.job_id, {
      $push: { applicants: { applicant_id: input.applicant_id } },
    });
  }

  async findAll(): Promise<Job[]> {
    return this.jobModel.find();
  }
}
