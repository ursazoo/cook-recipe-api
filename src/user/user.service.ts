import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from '../common/prisma.service';
import { makeSalt, encryptPassword } from '../utils/cryptogram';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // 查找特定用户
  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

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

  // 创建用户
  async createUser(data: Prisma.UserCreateInput & any): Promise<User> {
    const { name, email, passwd, repeatPassword } = data;
    if (passwd !== repeatPassword) return;

    const salt = makeSalt(); // 制作密码盐
    const hashPwd = encryptPassword(passwd, salt); // 加密密码

    console.log(data);

    return this.prisma.user
      .create({
        data: {
          name,
          email,
          passwd: hashPwd,
        },
      })
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
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
