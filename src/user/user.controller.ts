import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from './user.service';
import { SigninDTO, SignupDTO } from './user.dto'; // 引入 DTO
import { AuthService } from '../common/auth/auto.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get('find-user')
  findUser(
    @Query()
    query: {
      id?: string;
      name?: string;
      email?: string;
      account?: string;
    },
  ) {
    return this.userService.findUser(query);
  }

  @Get('')
  async findAllUser() {
    return this.userService.users({});
  }

  @Post('signup')
  async signup(@Body() signupDTO: SignupDTO) {
    return this.userService.signup(signupDTO);
  }

  @Post('signin')
  async signin(@Body() signinDTO: SigninDTO) {
    console.log(signinDTO);
    console.log('JWT验证 - Step 1: 用户请求登录');
    const authResult = await this.authService.validateUser(
      signinDTO.account,
      signinDTO.password,
    );
    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.user);
      case 2:
        return {
          success: false,
          code: 600,
          message: `账号或密码不正确`,
        };
      default:
        return {
          success: false,
          code: 600,
          message: '账号不存在，请重新输入',
        };
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('update')
  async updateUser(@Body() body: any) {
    return this.userService.updateUser(body);
  }
}
