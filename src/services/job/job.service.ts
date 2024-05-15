import { Model, FilterQuery, CreateQuery } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Job } from './job.schema';
import { RegisterJobInput } from "./job.input";

@Injectable()
export class JobService {
  constructor(
    @Inject('JOB_MODEL')
    private jobModel: Model<Job>,
  ) {}

  async registerJob(input: CreateQuery<RegisterJobInput>): Promise<Job> {
    return this.jobModel.create(input);
  }

  async findOne(query: FilterQuery<Job>): Promise<Job> {
    return this.jobModel.findOne(query).lean();
  }

  async find(): Promise<Job[]> {
    return this.jobModel.find().lean();
  }
}
