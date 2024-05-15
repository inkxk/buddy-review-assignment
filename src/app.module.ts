import path from "path";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ConfigModule } from "@nestjs/config";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";

import { DatabaseModule } from "./database/database.module";
import { UserModule } from "./services/user/user.module";
import { JobModule } from "./services/job/job.module";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: path.join(process.cwd(), "src/schema.gql"),
      playground: false,
    }),
    ConfigModule.forRoot(),
    DatabaseModule,
    UserModule,
    JobModule,
  ],
})
export class AppModule {}
