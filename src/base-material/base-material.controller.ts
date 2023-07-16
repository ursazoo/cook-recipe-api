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

import { BaseMaterialService } from './base-material.service';
import { CreateBaseMaterialDto } from './dto/create-base-material.dto';
import { UpdateBaseMaterialDto } from './dto/update-base-material.dto';

@Controller('base-material')
export class BaseMaterialController {
  constructor(private readonly baseMaterialService: BaseMaterialService) {}

  @Post('create')
  async create(@Body() createBaseMaterialDto: CreateBaseMaterialDto) {
    return this.baseMaterialService.create(createBaseMaterialDto);
  }

  @Get('list')
  async findAll(@Query() query: any) {
    console.log(query);
    return this.baseMaterialService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.baseMaterialService.findOne({ id });
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateBaseMaterialDto: UpdateBaseMaterialDto,
  ) {
    return this.baseMaterialService.update(id, updateBaseMaterialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.baseMaterialService.remove(id);
  }
}
