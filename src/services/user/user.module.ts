import { Module } from "@nestjs/common";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";
import { DatabaseModule } from "../../database/database.module";
import { userProviders } from "./user.providers";
import { UserController } from "./user.controller";

@Module({
  imports: [DatabaseModule],
  providers: [UserResolver, UserService, ...userProviders],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
