import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Logger } from "../../utils/log4js";

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.getArgByIndex(1).req;

    return next.handle().pipe(
      map((data) => {
        const logFormat = `<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
          Request original url: ${req.originalUrl}
          Method: ${req.method}
          IP: ${req.ip}
          User: ${JSON.stringify(req.user)}
          Response data:\n ${JSON.stringify(data)}
          <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`;
        Logger.info(logFormat);
        Logger.access(logFormat);

        /**
         * 封装的统一业务请求返回体
         *
         * code: 只要没有抛出HTTP错误，code就为200
         * success: 默认为 true, 在service中可以在业务发生错误的场景中传 false
         * data: 在没有传值的情况下，默认为 null
         * message: 只要没有抛出HTTP错误，message 就是自己定义的，默认为 success
         */
        return {
          code: 200,
          success: data.success === undefined,
          data: data.data || null,
          message: data.message || "success"
        };
      })
    );
  }
}
