import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

// 数据库服务
import { DatabaseService } from './common/database/database.service';

// 异常处理
import { AllExceptionsFilter } from './common/exceptions/base.exception.filter';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';

// 拦截器
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 设置全局路由前缀
  app.setGlobalPrefix('api');

  const prismaService = app.get(DatabaseService);
  await prismaService.enableShutdownHooks(app);

  // 增加全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor());

  // 增加全局异常处理
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());

  // 启动全局字段校验，保证请求接口字段校验正确
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
