import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateBaseMaterialDto } from './dto/create-base-material.dto';
import { UpdateBaseMaterialDto } from './dto/update-base-material.dto';
import { DatabaseService } from '../common/database/database.service';
import { FindAllBaseMaterialDto } from './dto/find-base-material.dto';

@Injectable()
export class BaseMaterialService {
  constructor(private prisma: DatabaseService) {}
  async create(createBaseMaterialDto: CreateBaseMaterialDto) {
    const baseMaterial = await this.prisma.baseMaterial.findUnique({
      where: {
        name: createBaseMaterialDto.name,
      },
    });

    if (baseMaterial?.id) {
      return {
        success: false,
        message: '当前食材已存在',
      };
    }

    try {
      await this.prisma.baseMaterial.create({
        data: {
          name: createBaseMaterialDto.name,
          emoji: createBaseMaterialDto.emoji || '',
          count: createBaseMaterialDto.count || 0,
          color: createBaseMaterialDto.color || 'transparent',
          secondaryMaterialId: createBaseMaterialDto.secondaryMaterialId || '',
        },
      });

      return {
        message: '添加食材成功',
      };
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  }

  async findAll(findAllBaseMaterialDto: FindAllBaseMaterialDto) {
    const result = await this.prisma.baseMaterial.findMany({
      where: {
        name: {
          contains: findAllBaseMaterialDto.name || '',
        },
        secondaryMaterialId: findAllBaseMaterialDto.secondaryMaterialId,
      },
      select: {
        id: true,
        name: true,
        emoji: true,
        count: true,
        secondaryMaterial: {
          select: {
            id: true,
            name: true,
          },
        },
        posts: true,
        createdTime: true,
      },
    });

    return {
      data: {
        list: result,
      },
    };
  }

  async findOne(
    baseMaterialWhereUniqueInput: Prisma.BaseMaterialWhereUniqueInput,
  ) {
    const baseMaterial = await this.prisma.user.findUnique({
      where: baseMaterialWhereUniqueInput,
    });

    return {
      data: baseMaterial,
    };
  }

  async update(id: string, updateBaseMaterialDto: UpdateBaseMaterialDto) {
    try {
      await this.prisma.baseMaterial.update({
        where: { id },
        data: updateBaseMaterialDto,
      });

      return {
        message: '修改食材信息成功',
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
      await this.prisma.baseMaterial.delete({
        where: { id },
      });

      return {
        message: '删除食材成功',
      };
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
    // return `This action removes a #${id} base-material`;
  }
}
