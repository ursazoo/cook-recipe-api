import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { IngredientSubTypeService } from './ingredient-sub-type.service';
import { CreateIngredientSubTypeDto } from './dto/create-ingredient-sub-type.dto';
import { UpdateIngredientSubTypeDto } from './dto/update-ingredient-sub-type.dto';
import { FindAllIngredientSubTypeDto } from "./dto/find-ingredient-sub-type.dto";

@Controller('base-material-sub-type')
export class IngredientSubTypeController {
  constructor(
    private readonly ingredientSubTypeService: IngredientSubTypeService,
  ) {}

  @Post('create')
  async create(@Body() createIngredientSubTypeDto: CreateIngredientSubTypeDto) {
    return this.ingredientSubTypeService.create(createIngredientSubTypeDto);
  }

  @Get('list')
  async findAll(@Query() query: FindAllIngredientSubTypeDto) {
    // return this.ingredientSubTypeService.findAll({
    //   where: {},
    // });
    return this.ingredientSubTypeService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.ingredientSubTypeService.findOne({
      id,
    });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIngredientSubTypeDto: UpdateIngredientSubTypeDto,
  ) {
    return this.ingredientSubTypeService.update(
      +id,
      updateIngredientSubTypeDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.ingredientSubTypeService.remove(id);
  }
}
