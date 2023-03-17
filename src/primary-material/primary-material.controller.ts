import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IngredientTypeService } from './ingredient-type.service';
import { CreateIngredientTypeDto } from './dto/create-ingredient-type.dto';
import { UpdateIngredientTypeDto } from './dto/update-ingredient-type.dto';

@Controller('base-material-type')
export class IngredientTypeController {
  constructor(private readonly ingredientTypeService: IngredientTypeService) {}

  @Post()
  async create(@Body() createIngredientTypeDto: CreateIngredientTypeDto) {
    return this.ingredientTypeService.create(createIngredientTypeDto);
  }

  @Get('/list')
  async findAll() {
    return this.ingredientTypeService.findAll({
      where: {},
    });
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.ingredientTypeService.findOne({
      id,
    });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIngredientTypeDto: UpdateIngredientTypeDto,
  ) {
    return this.ingredientTypeService.update(+id, updateIngredientTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.ingredientTypeService.remove(id);
  }
}
