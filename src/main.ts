import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

// 数据库服务
import { DatabaseService } from './common/database/database.service';

// 入参校验
import { ValidationPipe } from './common/pipes/validation.pipe';

// 异常处理
import { AllExceptionsFilter } from './common/exceptions/base.exception.filter';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';

// 拦截器
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

// 日志中间件
import { LoggerMiddleware } from './common/middlewares/logger/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const prismaService = app.get(DatabaseService);
  await prismaService.enableShutdownHooks(app);

  app.use(express.json()); // For parsing application/json
  app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

  // 设置日志中间件
  app.use(LoggerMiddleware);

  // 设置全局路由前缀
  app.setGlobalPrefix('');

  // 增加全局异常处理
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());

  // 增加全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor());

  // 启动全局字段校验，保证请求接口字段校验正确
  app.useGlobalPipes(new ValidationPipe());

  // app.use(cookieParser());

  // app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('接口文档')
    .setDescription('描述信息')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/docs', app, document);

  await app.listen(9000);
}
bootstrap();
