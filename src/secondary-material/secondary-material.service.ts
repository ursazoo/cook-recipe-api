import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateSecondaryMaterialDto } from './dto/create-secondary-material.dto';
import { UpdateSecondaryMaterialDto } from './dto/update-secondary-material.dto';
import { DatabaseService } from '../common/database/database.service';
import { FindAllBaseMaterialDto } from '../base-material/dto/find-base-material.dto';
import { FindAllSecondaryMaterialDto } from './dto/find-secondary-material.dto';

@Injectable()
export class SecondaryMaterialService {
  constructor(private prisma: DatabaseService) {}
  async create(createSecondaryMaterialDto: CreateSecondaryMaterialDto) {
    const secondaryMaterial = await this.findOne({
      name: createSecondaryMaterialDto.name,
    });

    if (secondaryMaterial.data) {
      return {
        success: false,
        message: '当前食材二级已存在',
      };
    }

    try {
      const createdSecondaryMaterial =
        await this.prisma.secondaryMaterial.create({
          data: {
            name: createSecondaryMaterialDto.name,
            color: createSecondaryMaterialDto.color,
            primaryMaterialId: createSecondaryMaterialDto.primaryMaterialId,
          },
        });

      return {
        data: createdSecondaryMaterial,
        message: '添加食材二级分类成功',
      };
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  }

  async findAll(findAllSecondaryMaterialDto: FindAllSecondaryMaterialDto) {
    const result = await this.prisma.secondaryMaterial.findMany({
      where: {
        name: {
          contains: findAllSecondaryMaterialDto.name || '',
        },
      },
      select: {
        id: true,
        name: true,
        color: true,
        createdTime: true,
        primaryMaterial: {
          select: {
            id: true,
            name: true,
          },
        },
        baseMaterialList: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return {
      data: {
        list: result,
      },
    };
  }

  async findOne(
    secondaryMaterialWhereUniqueInput: Prisma.SecondaryMaterialWhereUniqueInput,
  ) {
    const secondaryMaterial = await this.prisma.secondaryMaterial.findUnique({
      where: secondaryMaterialWhereUniqueInput,
    });

    return {
      data: secondaryMaterial,
    };
  }

  async update(
    id: string,
    updateSecondaryMaterialDto: UpdateSecondaryMaterialDto,
  ) {
    try {
      await this.prisma.secondaryMaterial.update({
        where: { id },
        data: updateSecondaryMaterialDto,
      });

      return {
        message: '修改食材二级分类信息成功',
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
      await this.prisma.secondaryMaterial.delete({
        where: { id },
      });

      return {
        message: '删除食材二级分类成功',
      };
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  }
}
