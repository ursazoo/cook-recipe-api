import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IngredientSubTypeService } from './ingredient-sub-type.service';
import { CreateIngredientSubTypeDto } from './dto/create-ingredient-sub-type.dto';
import { UpdateIngredientSubTypeDto } from './dto/update-ingredient-sub-type.dto';

@Controller('ingredient-sub-type')
export class IngredientSubTypeController {
  constructor(private readonly ingredientSubTypeService: IngredientSubTypeService) {}

  @Post()
  create(@Body() createIngredientSubTypeDto: CreateIngredientSubTypeDto) {
    return this.ingredientSubTypeService.create(createIngredientSubTypeDto);
  }

  @Get()
  findAll() {
    return this.ingredientSubTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ingredientSubTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIngredientSubTypeDto: UpdateIngredientSubTypeDto) {
    return this.ingredientSubTypeService.update(+id, updateIngredientSubTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ingredientSubTypeService.remove(+id);
  }
}
