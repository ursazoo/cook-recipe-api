import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RBACGuard implements CanActivate {
  // role[用户角色]: 0-超级管理员 | 1-管理员 | 2-开发&测试&运营 | 3-普通用户（只能查看）

  // role 取值来自使用 RBACGuard 守卫时传入的权限
  constructor(private readonly role: number) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.role > this.role) {
      throw new ForbiddenException('对不起，您无权操作');
    }
    return true;
  }
}
