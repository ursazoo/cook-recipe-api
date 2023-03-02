import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('find-one')
  findOne(@Query() query: any) {
    console.log(query);
    return this.userService.user(query);
  }

  @Post('create')
  createUser(@Body() body: any) {
    debugger;
    console.log('==========body=====');
    console.log(body);
    return this.userService.createUser(body);
  }
}
