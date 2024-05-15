import { Module } from "@nestjs/common";
import { JobResolver } from "./job.resolver";
import { JobService } from "./job.service";
import { DatabaseModule } from "../../database/database.module";
import { jobProviders } from "./job.providers";
import { JobController } from "./job.controller";

@Module({
  imports: [DatabaseModule],
  providers: [JobResolver, JobService, ...jobProviders],
  exports: [JobService],
  controllers: [JobController],
})
export class JobModule {}
