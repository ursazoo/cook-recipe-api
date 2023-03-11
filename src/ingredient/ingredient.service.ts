import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { DatabaseService } from '../common/database/database.service';

@Injectable()
export class IngredientService {
  constructor(private prisma: DatabaseService) {}
  async create(createIngredientDto: CreateIngredientDto) {
    const ingredient = await this.findOne({ name: createIngredientDto.name });

    if (ingredient.data) {
      return {
        success: false,
        message: '当前食材已存在',
      };
    }

    console.log('========createIngredientDto==========');
    console.log(createIngredientDto);

    try {
      const createdIngredient = await this.prisma.ingredient.create({
        data: {
          name: createIngredientDto.name,
          emoji: createIngredientDto.emoji || '',
          times: createIngredientDto.times || 0,
          ingredientSubTypeId: Number(createIngredientDto.ingredientSubTypeId),
        },
      });

      return {
        data: createdIngredient,
        message: '添加食材成功',
      };
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  }

  async findAll(params: { where: Prisma.IngredientWhereInput }) {
    const result = await this.prisma.ingredient.findMany({
      where: {},
      include: {
        ingredientSubType: true,
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
    // return `This action updates a #${id} ingredient`;
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
    // return `This action removes a #${id} ingredient`;
  }
}
