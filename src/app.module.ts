import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProfileModule } from "./profile/profile.module";
import { ConfigModule } from "@nestjs/config";
import getDatabaseUrl from "./config/database.url";
import {EmailModule} from "./mail/email.module";
import {BookModule} from "./book/book.module";

@Module({
  imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      MongooseModule.forRoot(getDatabaseUrl()),
      ProfileModule,
      EmailModule,
      BookModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
