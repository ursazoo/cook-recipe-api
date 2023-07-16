import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateCookwareDto } from './dto/create-cookware.dto';
import { UpdateCookwareDto } from './dto/update-cookware.dto';
import { DatabaseService } from '../common/database/database.service';

@Injectable()
export class CookwareService {
  constructor(private prisma: DatabaseService) {}

  async create(createCookwareDto: CreateCookwareDto) {
    const cookware = await this.findOne({
      name: createCookwareDto.name,
    });

    if (cookware.data) {
      return {
        success: false,
        message: '当前厨具已存在',
      };
    }

    try {
      const createdCookware = await this.prisma.cookware.create({
        data: {
          name: createCookwareDto.name,
        },
      });

      return {
        data: createdCookware,
        message: '添加厨具成功',
      };
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  }

  async findStructuredList() {
    const result = await this.prisma.cookware.findMany({
      where: {},
    });

    return {
      data: {
        list: result,
      },
    };
  }

  async findAll(params: { where: Prisma.CookwareWhereInput }) {
    const result = await this.prisma.cookware.findMany({
      where: {},
      include: {
        posts: true,
      },
    });

    return {
      data: {
        list: result,
      },
    };
  }

  async findOne(cookwareWhereUniqueInput: Prisma.CookwareWhereUniqueInput) {
    const cookware = await this.prisma.cookware.findUnique({
      where: cookwareWhereUniqueInput,
    });

    return {
      data: cookware,
    };
  }

  async update(id: number, updateCookwareDto: UpdateCookwareDto) {
    try {
      await this.prisma.cookware.update({
        where: { id },
        data: updateCookwareDto,
      });

      return {
        message: '修改厨具信息成功',
      };
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.cookware.delete({
        where: { id },
      });

      return {
        message: '删除厨具成功',
      };
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  }
}
