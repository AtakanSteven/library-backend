import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProfileModule } from "./profile/profile.module";
import { ConfigModule } from "@nestjs/config";
import getDatabaseUrl from "./config/database.url";

@Module({
  imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      MongooseModule.forRoot(getDatabaseUrl()),
      ProfileModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
