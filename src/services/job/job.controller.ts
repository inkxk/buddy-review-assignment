import { Body, Controller, Get, Post } from "@nestjs/common";
import { RegisterJobInput } from "./job.input";
import { JobService } from "./job.service";

@Controller("/job")
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  async getAllJobss() {
    const users = await this.jobService.find();
    return { users };
  }

  @Post("/register")
  async registerJob(@Body() data: RegisterJobInput) {
    const user = await this.jobService.registerJob(data);
    return { user };
  }
}
