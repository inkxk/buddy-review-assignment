import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { RegisterJobInput } from "./job.input";
import { JobService } from "./job.service";
import { Job } from "./job.schema";

@Resolver(() => Job)
export class JobResolver {
  constructor(private jobService: JobService) {}

  @Mutation(() => Job)
  async registerJob(@Args("input") input: RegisterJobInput) {
    return this.jobService.registerJob(input);
  }

  @Query(() => [Job])
  async users() {
    return this.jobService.find();
  }
}
