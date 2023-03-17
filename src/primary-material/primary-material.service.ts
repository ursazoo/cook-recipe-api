import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreatePrimaryMaterialDto } from './dto/create-primary-material.dto';
import { UpdatePrimaryMaterialDto } from './dto/update-primary-material.dto';
import { DatabaseService } from '../common/database/database.service';

@Injectable()
export class PrimaryMaterialService {
  constructor(private prisma: DatabaseService) {}

  async create(createPrimaryMaterialDto: CreatePrimaryMaterialDto) {
    const primaryMaterial = await this.findOne({
      name: createPrimaryMaterialDto.name,
    });

    if (primaryMaterial.data) {
      return {
        success: false,
        message: '当前食材已存在',
      };
    }

    try {
      const createdPrimaryMaterial = await this.prisma.primaryMaterial.create({
        data: {
          name: createPrimaryMaterialDto.name,
        },
      });

      return {
        data: createdPrimaryMaterial,
        message: '添加食材一级分类成功',
      };
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  }

  async findAll(params: { where: Prisma.PrimaryMaterialWhereInput }) {
    const result = await this.prisma.primaryMaterial.findMany({
      where: {},
      include: {
        secondaryMaterialList: true,
      },
    });

    return {
      data: {
        list: result,
      },
    };
  }

  async findOne(
    primaryMaterialWhereUniqueInput: Prisma.PrimaryMaterialWhereUniqueInput,
  ) {
    const primaryMaterial = await this.prisma.primaryMaterial.findUnique({
      where: primaryMaterialWhereUniqueInput,
    });

    return {
      data: primaryMaterial,
    };
  }

  async update(id: string, updatePrimaryMaterialDto: UpdatePrimaryMaterialDto) {
    try {
      await this.prisma.primaryMaterial.update({
        where: { id },
        data: updatePrimaryMaterialDto,
      });

      return {
        message: '修改食材一级分类信息成功',
      };
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.primaryMaterial.delete({
        where: { id },
      });

      return {
        message: '删除食材一级分类成功',
      };
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  }
}
