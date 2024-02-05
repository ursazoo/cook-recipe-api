import { Injectable } from "@nestjs/common";
import { Request } from "express";
import { Prisma, User } from "@prisma/client";
import { DatabaseService } from "../common/database/database.service";
import { encryptPassword, makeSalt } from "../utils/cryptogram";
import { SignupDTO } from "./dto";
import { FindAllUserDto } from "./dto/find-all-user.dto";

@Injectable()
export class UserService {
  constructor(private prisma: DatabaseService) {
  }

  // 查找用户
  async findAllUser(findAllUserDto: FindAllUserDto): Promise<{ data: any }> {
    // const { skip, take, cursor, where, orderBy } = findAllPostDto;

    const where: any = {};

    const nameQuery = {
      contains: findAllUserDto.name
    };

    const idQuery = {
      contains: findAllUserDto.id
    };

    const accountQuery = {
      contains: findAllUserDto.account
    };

    if (findAllUserDto?.name) {
      where.name = nameQuery;
    }

    if (findAllUserDto?.id) {
      where.name = idQuery;
    }

    if (findAllUserDto?.account) {
      where.name = accountQuery;
    }

    const result = await this.prisma.user.findMany({
      skip: findAllUserDto.pageSize * (findAllUserDto.pageNum - 1),
      take: findAllUserDto.pageSize,
      // cursor,
      orderBy: {
        name: "asc"
      },
      where,
      select: {
        id: true,
        name: true,
        account: true,
        posts: true,
        role: true,
        createdTime: true
      }
    });
    return {
      data: { list: result }
    };
  }

  // 注册
  async signup(signupDTO: SignupDTO) {
    const { account, name, password } = signupDTO;

    const user = await this.findUser({ account });

    if (user.data) {
      return {
        success: false,
        message: "当前用户已存在"
      };
    }

    const salt = makeSalt(); // 制作密码盐
    const hashPassword = encryptPassword(password, salt); // 加密密码

    try {
      await this.prisma.user.create({
        data: {
          name,
          account,
          salt,
          password: hashPassword
        }
      });

      return {
        message: "注册成功"
      };
    } catch (e) {
      return {
        success: false,
        message: e.message
      };
    }
  }

  // 查找特定用户
  async findUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    option?: any
  ): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      select: {
        id: true,
        name: true,
        account: true,
        role: true,
        createdTime: true,
        salt: !!option?.salt,
        password: !!option?.password
      }
    });

    console.log(userWhereUniqueInput);

    if (!user) {
      return {
        success: false,
        message: "没有找到该用户"
      };
    }

    return {
      data: user
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
      where
    });
  }

  // 删除用户
  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where
    });
  }

  //   获取当前登录的用户信息
  async getUserInfo(request: Request): Promise<{ data: any }> {
    return {
      data: (request as any)?.user
    };
  }
}
