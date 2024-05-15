import { Model, CreateQuery } from "mongoose";
import { Injectable, Inject, NotFoundException, ConflictException } from "@nestjs/common";
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
    const companyExists = await this.userModel
      .findOne({ _id: input.company_id, type: "company" })
      .exec();

    if (!companyExists) {
      throw new NotFoundException("Company not found");
    }
    return this.jobModel.create(input);
  }

  async applyJob(input: CreateQuery<ApplyJobInput>): Promise<Job> {
    const applicantExists = await this.userModel
      .findOne({ _id: input.applicant_id, type: "applicant" })
      .exec();
    const jobExists = await this.jobModel.findOne({ _id: input.job_id }).exec();

    if (!applicantExists || !jobExists) {
      throw new NotFoundException("Applicant or Job not found");
    }

    // check the applicant had already applied this job
    const alreadyApplied = await this.jobModel
      .findOne({
        _id: input.job_id,
        applicants: { $elemMatch: { applicant_id: input.applicant_id } },
      })
      .exec();

    if (alreadyApplied) {
      throw new ConflictException("Applicant have already applied this job");
    }

    return this.jobModel.findByIdAndUpdate(
      input.job_id,
      {
        $push: { applicants: { applicant_id: input.applicant_id } },
      },
      { new: true },
    );
  }

  async findAll(): Promise<Job[]> {
    return this.jobModel.find();
  }
}
