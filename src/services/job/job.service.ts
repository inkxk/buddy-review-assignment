import { Model, CreateQuery, UpdateQuery, FilterQuery } from "mongoose";
import {
  Injectable,
  Inject,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { Job } from "./job.schema";
import { User } from "../user/user.schema";
import {
  RegisterJobInput,
  ApplyJobInput,
  CloseJobInput,
  UserQueryJobInput,
  CompanyQueryApplicantInput,
  UpdateApplicantStatusInput,
} from "./job.input";

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

  async applyJob(input: UpdateQuery<ApplyJobInput>): Promise<Job> {
    const applicantExists = await this.userModel
      .findOne({ _id: input.applicant_id, type: "applicant" })
      .exec();
    const jobExists = await this.jobModel
      .findOne({ _id: input.job_id, is_deleted: false })
      .exec();

    if (!applicantExists || !jobExists) {
      throw new NotFoundException("Applicant or Job not found");
    }

    // check the applicant had already applied this job
    const alreadyApplied = await this.jobModel
      .findOne({
        _id: input.job_id,
        applicants: { $elemMatch: { applicant_id: input.applicant_id } },
        is_deleted: false,
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

  async closeJob(input: UpdateQuery<CloseJobInput>): Promise<Job> {
    const jobExists = await this.jobModel
      .findOne({ _id: input.job_id, is_deleted: false })
      .exec();

    if (!jobExists) {
      throw new NotFoundException("Job not found");
    }

    return this.jobModel.findByIdAndUpdate(
      input.job_id,
      {
        is_deleted: true,
      },
      { new: true },
    );
  }

  async userQueryJob(input: FilterQuery<UserQueryJobInput>): Promise<Job[]> {
    return this.jobModel.aggregate([
      {
        $match: {
          is_deleted: false,
          ...(input.title ? { title: input.title } : {}),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "company_id",
          foreignField: "_id",
          as: "users",
        },
      },
      { $unwind: "$users" },
      {
        $match: {
          "users.type": "company",
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          company_name: "$users.name",
        },
      },
    ]);
  }

  async companyQueryApplicant(
    input: FilterQuery<CompanyQueryApplicantInput>,
  ): Promise<Job[]> {
    return this.jobModel.find({
      is_deleted: false,
      company_id: input.company_id,
      ...(input.job_id ? { _id: input.job_id } : {}),
    });
  }

  async updateApplicantStatus(
    input: UpdateQuery<UpdateApplicantStatusInput>,
  ): Promise<Job> {
    const alreadyApplied = await this.jobModel
      .findOne({
        _id: input.job_id,
        applicants: { $elemMatch: { applicant_id: input.applicant_id } },
        is_deleted: false,
      })
      .exec();

    if (!alreadyApplied) {
      throw new NotFoundException("Job or Applicant not found");
    }

    return this.jobModel.findOneAndUpdate(
      {
        _id: input.job_id,
        applicants: { $elemMatch: { applicant_id: input.applicant_id } },
        is_deleted: false,
      },
      { $set: { "applicants.$.application_status": input.application_status } },
      { new: true },
    );
  }
}
