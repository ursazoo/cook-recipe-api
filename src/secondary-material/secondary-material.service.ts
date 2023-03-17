import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateIngredientSubTypeDto } from './dto/create-ingredient-sub-type.dto';
import { UpdateIngredientSubTypeDto } from './dto/update-ingredient-sub-type.dto';
import { DatabaseService } from '../common/database/database.service';
import { FindAllIngredientDto } from '../base-material/dto/find-base-material.dto';
import { FindAllIngredientSubTypeDto } from './dto/find-ingredient-sub-type.dto';

@Injectable()
export class IngredientSubTypeService {
  constructor(private prisma: DatabaseService) {}
  async create(createIngredientSubTypeDto: CreateIngredientSubTypeDto) {
    const ingredientSubType = await this.findOne({
      name: createIngredientSubTypeDto.name,
    });

    if (ingredientSubType.data) {
      return {
        success: false,
        message: '当前食材二级已存在',
      };
    }

    try {
      const createdIngredientSubType =
        await this.prisma.ingredientSubType.create({
          data: {
            name: createIngredientSubTypeDto.name,
            ingredientTypeId: Number(
              createIngredientSubTypeDto.ingredientTypeId,
            ),
          },
        });

      return {
        data: createdIngredientSubType,
        message: '添加食材二级分类成功',
      };
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  }

  async findAll(findAllIngredientSubTypeDto: FindAllIngredientSubTypeDto) {
    const result = await this.prisma.ingredientSubType.findMany({
      where: {
        // ingredients: {
        //   // has: findAllIngredientSubTypeDto.name || '',
        //
        // },
        // ingredientType: {
        //   contains: findAllIngredientSubTypeDto?.ingredientTypeId || '',
        // },
        // ingredients: {
        //   has: findAllIngredientSubTypeDto.ingredientId || '',
        // },
      },
      select: {
        id: true,
        name: true,
        ingredientType: {
          select: {
            id: true,
            name: true,
          },
        },
        ingredients: {
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
    ingredientSubTypeWhereUniqueInput: Prisma.IngredientSubTypeWhereUniqueInput,
  ) {
    const ingredientSubType = await this.prisma.ingredientSubType.findUnique({
      where: ingredientSubTypeWhereUniqueInput,
    });

    return {
      data: ingredientSubType,
    };
  }

  async update(
    id: number,
    updateIngredientSubTypeDto: UpdateIngredientSubTypeDto,
  ) {
    try {
      await this.prisma.ingredientSubType.update({
        where: { id },
        data: updateIngredientSubTypeDto as any,
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

  async remove(id: number) {
    try {
      await this.prisma.ingredientSubType.delete({
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
