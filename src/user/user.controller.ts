import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('find-one')
  findOne(@Body() body: any) {
    return this.userService.user(body.name);
  }
}
