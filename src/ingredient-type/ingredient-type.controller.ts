import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IngredientTypeService } from './ingredient-type.service';
import { CreateIngredientTypeDto } from './dto/create-ingredient-type.dto';
import { UpdateIngredientTypeDto } from './dto/update-ingredient-type.dto';

@Controller('ingredient-type')
export class IngredientTypeController {
  constructor(private readonly ingredientTypeService: IngredientTypeService) {}

  @Post()
  create(@Body() createIngredientTypeDto: CreateIngredientTypeDto) {
    return this.ingredientTypeService.create(createIngredientTypeDto);
  }

  @Get()
  findAll() {
    return this.ingredientTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ingredientTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIngredientTypeDto: UpdateIngredientTypeDto) {
    return this.ingredientTypeService.update(+id, updateIngredientTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ingredientTypeService.remove(+id);
  }
}
