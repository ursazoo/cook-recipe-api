import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { SigninDTO, SignupDTO } from './dto'; // 引入 DTO
import { UserService } from './user.service';
import { AuthService } from '../common/auth/auto.service';
import { RequestIpService } from '../common/request-ip/request-ip.service';
import { FindAllUserDto } from './dto/find-all-user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly requestIpService: RequestIpService,
  ) {}

  @Get('find-user')
  findUser(
    @Query()
    query: {
      id?: number;
      name?: string;
      email?: string;
      account?: string;
    },
  ) {
    return this.userService.findUser(query);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/list')
  async findAllUser(@Body() findAllUserDto: FindAllUserDto) {
    return this.userService.findAllUser(findAllUserDto);
  }

  @Post('signup')
  async signup(@Body() signupDTO: SignupDTO) {
    return this.userService.signup(signupDTO);
  }

  @Post('signin')
  async signin(@Req() request: Request, @Body() signinDTO: SigninDTO) {
    console.log(signinDTO);
    console.log('JWT验证 - Step 1: 用户请求登录');
    const authResult = await this.authService.validateUser(
      signinDTO.account,
      signinDTO.password,
    );
    switch (authResult.code) {
      case 1:
        const ip = this.requestIpService.recordIp(request);
        console.log(ip);
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

  @UseGuards(AuthGuard('jwt'))
  @Get('/info')
  async getUserInfo(@Req() request: Request) {
    console.log('user', (request as any)?.user);
    return this.userService.getUserInfo(request);
    // return (request as any)?.user || {};
  }
}
