import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProfileModule } from "./profile/profile.module";
import { ConfigModule } from "@nestjs/config";
import getDatabaseUrl from "./config/database.url";
import { EmailModule } from "./mail/email.module";
import { BookModule } from "./book/book.module";
import { AuthModule } from "./auth/auth.module";
import { LoggerMiddleware } from "./middlewaretesrt/middleware";
import { MyLoggerModule } from "./myLogger/myLogger.module";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), MongooseModule.forRoot(getDatabaseUrl()), ProfileModule, EmailModule, BookModule, AuthModule, MyLoggerModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
