import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { DatabaseService } from '../common/database/database.service';
import { makeSalt, encryptPassword } from '../utils/cryptogram';

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

  // 创建用户
  async createUser(data: Prisma.UserCreateInput & any): Promise<User | any> {
    const { account, name, email, password, repeatPassword } = data;
    if (password !== repeatPassword) return;

    const salt = makeSalt(); // 制作密码盐
    const hashPwd = encryptPassword(password, salt); // 加密密码

    const user = await this.findUserAccount(account);

    if (user) {
      return {
        success: false,
        data: null,
        message: '当前用户已存在',
      };
    }

    return this.prisma.user
      .create({
        data: {
          name,
          email,
          account,
          salt,
          password: hashPwd,
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

  // 查找特定用户
  async findUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async findUserAccount(account: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        account,
      },
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
