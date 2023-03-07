import { Injectable } from '@nestjs/common';
import { CreateIngredientTypeDto } from './dto/create-ingredient-type.dto';
import { UpdateIngredientTypeDto } from './dto/update-ingredient-type.dto';

@Injectable()
export class IngredientTypeService {
  create(createIngredientTypeDto: CreateIngredientTypeDto) {
    return 'This action adds a new ingredientType';
  }

  findAll() {
    return `This action returns all ingredientType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ingredientType`;
  }

  update(id: number, updateIngredientTypeDto: UpdateIngredientTypeDto) {
    return `This action updates a #${id} ingredientType`;
  }

  remove(id: number) {
    return `This action removes a #${id} ingredientType`;
  }
}
