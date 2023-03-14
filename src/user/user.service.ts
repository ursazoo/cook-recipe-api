import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { DatabaseService } from '../common/database/database.service';
import { makeSalt, encryptPassword } from '../utils/cryptogram';
import { SignupDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: DatabaseService) {}

  // 查找用户
  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  // 注册
  async signup(signupDTO: SignupDTO) {
    const { account, name, password } = signupDTO;

    const user = await this.findUser({ account });

    if (user.data) {
      return {
        success: false,
        message: '当前用户已存在',
      };
    }

    const salt = makeSalt(); // 制作密码盐
    const hashPwd = encryptPassword(password, salt); // 加密密码

    try {
      await this.prisma.user.create({
        data: {
          name,
          account,
          salt,
          password: hashPwd,
        },
      });

      return {
        message: '注册成功',
      };
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  }

  // 查找特定用户
  async findUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });

    if (!user) {
      return {
        success: false,
        message: '没有找到该用户',
      };
    }

    return {
      data: {
        id: user.id,
        name: user.name,
        account: user.account,
        createdAt: user.createdAt,
        role: user.role,
      },
    };
  }

  // 更新用户信息
  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  // 删除用户
  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
