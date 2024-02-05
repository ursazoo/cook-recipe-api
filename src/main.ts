import { NestFactory } from "@nestjs/core";
import * as express from "express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

// import * as cookieParser from 'cookie-parser';
import { AppModule } from "./app.module";

// 数据库服务
import { DatabaseService } from "./common/database/database.service";

// 入参校验
import { ValidationPipe } from "./common/pipes/validation.pipe";

// 异常处理
import { AllExceptionsFilter } from "./common/exceptions/base.exception.filter";
import { HttpExceptionFilter } from "./common/exceptions/http.exception.filter";

// 拦截器
import { TransformInterceptor } from "./common/interceptors/transform.interceptor";

// 日志中间件
import { LoggerMiddleware } from "./common/middlewares/logger/logger.middleware";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const prismaService = app.get(DatabaseService);
  await prismaService.enableShutdownHooks(app);

  app.use(express.json()); // For parsing application/json
  app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

  // 设置日志中间件
  app.use(LoggerMiddleware);

  // 设置全局路由前缀
  app.setGlobalPrefix("");

  // 增加全局异常处理
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());

  // 增加全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor());

  // 启动全局字段校验，保证请求接口字段校验正确
  app.useGlobalPipes(new ValidationPipe());

  // app.use(cookieParser());

  // app.enableCors();

  const options = new DocumentBuilder()
    .setTitle("接口文档")
    .setDescription("描述信息")
    .setVersion("1.0.0")
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup("/docs", app, document);

  const configService = app.get(ConfigService); // 获取全局配置

  const PORT = configService.get<number>("PORT", 9000);
  const HOST = configService.get("HOST", "localhost");

  await app.listen(PORT, () => {
    if (HOST === "localhost") {
      console.log(
        `服务已经启动，查看接口文档请访问:http://localhost:${PORT}/docs`
      );
    } else {
      console.log(
        `服务已经启动，查看接口文档请访问:https://${HOST}:${PORT}/docs`
      );
    }
  });
}

bootstrap();
