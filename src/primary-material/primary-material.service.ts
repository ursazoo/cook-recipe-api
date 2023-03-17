import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateIngredientTypeDto } from './dto/create-ingredient-type.dto';
import { UpdateIngredientTypeDto } from './dto/update-ingredient-type.dto';
import { DatabaseService } from '../common/database/database.service';

@Injectable()
export class IngredientTypeService {
  constructor(private prisma: DatabaseService) {}

  async create(createIngredientTypeDto: CreateIngredientTypeDto) {
    const ingredientType = await this.findOne({
      name: createIngredientTypeDto.name,
    });

    console.log(ingredientType);

    if (ingredientType.data) {
      return {
        success: false,
        message: '当前食材已存在',
      };
    }

    try {
      const createdIngredientType = await this.prisma.ingredientType.create({
        data: {
          name: createIngredientTypeDto.name,
        },
      });

      return {
        data: createdIngredientType,
        message: '添加食材一级分类成功',
      };
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  }

  async findAll(params: { where: Prisma.IngredientTypeWhereInput }) {
    const result = await this.prisma.ingredientType.findMany({
      where: {},
      include: {
        ingredientSubTypes: true,
      },
    });

    return {
      data: {
        list: result,
      },
    };
  }

  async findOne(
    ingredientTypeWhereUniqueInput: Prisma.IngredientTypeWhereUniqueInput,
  ) {
    const ingredientType = await this.prisma.ingredientType.findUnique({
      where: ingredientTypeWhereUniqueInput,
    });

    return {
      data: ingredientType,
    };
  }

  async update(id: number, updateIngredientTypeDto: UpdateIngredientTypeDto) {
    try {
      await this.prisma.ingredientType.update({
        where: { id },
        data: updateIngredientTypeDto,
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

  async remove(id: number) {
    try {
      await this.prisma.ingredientType.delete({
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
