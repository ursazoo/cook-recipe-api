import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateIngredientSubTypeDto } from './dto/create-ingredient-sub-type.dto';
import { UpdateIngredientSubTypeDto } from './dto/update-ingredient-sub-type.dto';
import { DatabaseService } from '../common/database/database.service';

@Injectable()
export class IngredientSubTypeService {
  constructor(private prisma: DatabaseService) {}
  async create(createIngredientSubTypeDto: CreateIngredientSubTypeDto) {
    const ingredientSubType = await this.findOne({
      name: createIngredientSubTypeDto.name,
    });

    console.log(ingredientSubType);

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
            ingredientTypeId: Number(createIngredientSubTypeDto.ingredientTypeId),
            // ingredients: createIngredientSubTypeDto.ingredients as any,
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

  async findAll(params: { where: Prisma.IngredientSubTypeWhereInput }) {
    // const result = await this.prisma.ingredientSubType.findMany(params);
    //
    // return {
    //   data: {
    //     list: result,
    //   },
    // };

    const result = await this.prisma.ingredientSubType.findMany({
      where: {},
      include: {
        ingredientType: true,
        ingredients: true
      }
    })

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
