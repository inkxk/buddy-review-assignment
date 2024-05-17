import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import {
  RegisterJobInput,
  ApplyJobInput,
  CloseJobInput,
  UserQueryJobInput,
} from "./job.input";
import { JobService } from "./job.service";
import { Job } from "./job.schema";
import { User } from "../user/user.schema";

@Resolver(() => Job)
export class JobResolver {
  constructor(private jobService: JobService) {}

  @Mutation(() => Job)
  async registerJob(@Args("input") input: RegisterJobInput) {
    return this.jobService.registerJob(input);
  }

  @Mutation(() => Job)
  async applyJob(@Args("input") input: ApplyJobInput) {
    return this.jobService.applyJob(input);
  }

  @Mutation(() => Job)
  async closeJob(@Args("input") input: CloseJobInput) {
    return this.jobService.closeJob(input);
  }

  @Query(() => [Job])
  async userQueryJob(@Args("input") input: UserQueryJobInput) {
    return this.jobService.userQueryJob(input);
  }

  @Query(() => [User])
  async companyQueryApplicant(@Args("input") input: CloseJobInput) {
    return this.jobService.companyQueryApplicant(input);
  }
}
