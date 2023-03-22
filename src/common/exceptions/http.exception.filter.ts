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

/**
 * 捕获 HTTP相关 异常
 */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from '../../utils/log4js';
import { BusinessException } from './business.exception';

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
    const error = exception.getResponse();

    // 处理业务异常
    if (exception instanceof BusinessException) {
      console.log('===业务异常===');
      response.status(HttpStatus.OK).send({
        data: null,
        status: error['code'],
        message: error['message'],
        success: false,
      });
      return;
    }
    console.log('===http异常===');
    console.log({
      status,
      message: error['message'],
    });
    response.status(status).send({
      status,
      message: error['message'],
    });

    // response.status(status).send({
    //   code: status,
    //   message: `${status >= 500 ? 'Service Error' : 'Client Error'}: ${
    //     exception.getResponse().message
    //   }`,
    // });
  }
}
