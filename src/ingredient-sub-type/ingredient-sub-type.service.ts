import { Injectable } from '@nestjs/common';
import { CreateIngredientSubTypeDto } from './dto/create-ingredient-sub-type.dto';
import { UpdateIngredientSubTypeDto } from './dto/update-ingredient-sub-type.dto';

@Injectable()
export class IngredientSubTypeService {
  create(createIngredientSubTypeDto: CreateIngredientSubTypeDto) {
    return 'This action adds a new ingredientSubType';
  }

  findAll() {
    return `This action returns all ingredientSubType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ingredientSubType`;
  }

  update(id: number, updateIngredientSubTypeDto: UpdateIngredientSubTypeDto) {
    return `This action updates a #${id} ingredientSubType`;
  }

  remove(id: number) {
    return `This action removes a #${id} ingredientSubType`;
  }
}
