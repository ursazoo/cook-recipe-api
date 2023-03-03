import { NestFactory } from '@nestjs/core';
// import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

// 数据库服务
import { DatabaseService } from './common/database/database.service';

import { ValidationPipe } from './common/pipes/validation.pipe';

// 异常处理
import { AllExceptionsFilter } from './common/exceptions/base.exception.filter';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';

// 拦截器
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prismaService = app.get(DatabaseService);
  await prismaService.enableShutdownHooks(app);

  // 设置全局路由前缀
  app.setGlobalPrefix('api');

  // 增加全局异常处理
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());

  // 增加全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor());

  // 启动全局字段校验，保证请求接口字段校验正确
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
