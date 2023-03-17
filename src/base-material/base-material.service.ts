import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { DatabaseService } from '../common/database/database.service';
import { FindAllIngredientDto } from './dto/find-ingredient.dto';

@Injectable()
export class IngredientService {
  constructor(private prisma: DatabaseService) {}
  async create(createIngredientDto: CreateIngredientDto) {
    const ingredient = await this.prisma.ingredient.findUnique({
      where: {
        name: createIngredientDto.name,
      },
    });

    if (ingredient?.id) {
      return {
        success: false,
        message: '当前食材已存在',
      };
    }

    try {
      await this.prisma.ingredient.create({
        data: {
          name: createIngredientDto.name,
          emoji: createIngredientDto.emoji || '',
          count: createIngredientDto.count || 0,
          ingredientSubTypeId: Number(createIngredientDto.ingredientSubTypeId),
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

  async findAll(findAllIngredientDto: FindAllIngredientDto) {
    const result = await this.prisma.ingredient.findMany({
      where: {
        name: {
          contains: findAllIngredientDto.name || '',
        },
        ingredientSubTypeId:
          Number(findAllIngredientDto.ingredientSubTypeId) || {},
      },
      select: {
        id: true,
        name: true,
        emoji: true,
        count: true,
        ingredientSubType: {
          select: {
            id: true,
            name: true,
          },
        },
        createdAt: true,
      },
    });

    return {
      data: {
        list: result,
      },
    };
  }

  async findOne(ingredientWhereUniqueInput: Prisma.IngredientWhereUniqueInput) {
    const ingredient = await this.prisma.user.findUnique({
      where: ingredientWhereUniqueInput,
    });

    return {
      data: ingredient,
    };
  }

  async update(id: number, updateIngredientDto: UpdateIngredientDto) {
    try {
      await this.prisma.ingredient.update({
        where: { id },
        data: updateIngredientDto,
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

  async remove(id: number) {
    try {
      await this.prisma.ingredient.delete({
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
