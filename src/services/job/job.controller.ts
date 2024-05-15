import { Body, Controller, Put, Post } from "@nestjs/common";
import { RegisterJobInput, ApplyJobInput } from "./job.input";
import { JobService } from "./job.service";

@Controller("/job")
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post("/register")
  async registerJob(@Body() data: RegisterJobInput) {
    const user = await this.jobService.registerJob(data);
    return { user };
  }

  @Put("/apply")
  async applyJob(@Body() data: ApplyJobInput) {
    const user = await this.jobService.applyJob(data);
    return { user };
  }
}
