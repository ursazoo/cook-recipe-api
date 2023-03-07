// import { BusinessException } from './business.exception';
//
// import {
//   ExceptionFilter,
//   Catch,
//   ArgumentsHost,
//   HttpException,
//   HttpStatus,
// } from '@nestjs/common';
//
// // 只捕获 HTTP 相关的异常错误
// @Catch(HttpException)
// export class HttpExceptionFilter implements ExceptionFilter {
//   catch(exception: HttpException, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse();
//     const request = ctx.getRequest();
//     const status = exception.getStatus();
//
//     if (exception instanceof BusinessException) {
//       const error = exception.getResponse();
//       response.status(HttpStatus.OK).send({
//         data: null,
//         status: error['code'],
//         extra: {},
//         message: error['message'],
//         success: false,
//       });
//       return;
//     }
//
//     response.status(status).send({
//       statusCode: status,
//       timestamp: new Date().toISOString(),
//       path: request.url,
//       message: exception.getResponse(),
//     });
//   }
// }

// src/filter/http-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from '../../utils/log4js';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const logFormat = `<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
      Request original url: ${request.originalUrl}
      Method: ${request.method}
      IP: ${request.ip}
      Status code: ${status}
      Response: ${exception.toString()} \n  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    `;
    Logger.error(logFormat);
    response.status(status).json({
      code: status,
      message: `${status >= 500 ? 'Service Error' : 'Client Error'}: ${
        exception.message
      }`,
    });
  }
}
