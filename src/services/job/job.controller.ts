import { Body, Controller, Put, Post } from "@nestjs/common";
import { RegisterJobInput, ApplyJobInput, CloseJobInput } from "./job.input";
import { JobService } from "./job.service";

@Controller("/job")
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post("/register")
  async registerJob(@Body() data: RegisterJobInput) {
    const job = await this.jobService.registerJob(data);
    return { job };
  }

  @Put("/apply")
  async applyJob(@Body() data: ApplyJobInput) {
    const job = await this.jobService.applyJob(data);
    return { job };
  }

  @Put("/close")
  async closeJob(@Body() data: CloseJobInput) {
    const job = await this.jobService.closeJob(data);
    return { job };
  }
}
