import { Body, Controller, Put, Post, Get, Query } from "@nestjs/common";
import { RegisterJobInput, ApplyJobInput, CloseJobInput, UserQueryJobInput, CompanyQueryApplicantInput } from "./job.input";
import { JobService } from "./job.service";

@Controller("/job")
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get("/query")
  async userQueryJob(@Query() data: UserQueryJobInput) {
    const jobs = await this.jobService.userQueryJob(data);
    return { jobs };
  }

  @Get("/query-applicant")
  async companyQueryApplicant(@Query() data: CompanyQueryApplicantInput) {
    const users = await this.jobService.companyQueryApplicant(data);
    return { users };
  }

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
