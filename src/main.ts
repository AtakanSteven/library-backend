import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { CorrelationIdMiddleware } from "./book/smt";
import { MyLoggerService } from "./myLogger/myLogger.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.useLogger(new MyLoggerService());

  const options = new DocumentBuilder().setTitle("Library").setDescription("The Library App").setVersion("1.0").addTag("books").addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("library", app, document);

  app.use(CorrelationIdMiddleware());
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
