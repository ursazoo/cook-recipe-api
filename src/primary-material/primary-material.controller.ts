import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PrimaryMaterialService } from './primary-material.service';
import { CreatePrimaryMaterialDto } from './dto/create-primary-material.dto';
import { UpdatePrimaryMaterialDto } from './dto/update-primary-material.dto';

@Controller('primary-material')
export class PrimaryMaterialController {
  constructor(
    private readonly primaryMaterialService: PrimaryMaterialService,
  ) {}

  @Post('create')
  async create(@Body() createPrimaryMaterialDto: CreatePrimaryMaterialDto) {
    return this.primaryMaterialService.create(createPrimaryMaterialDto);
  }

  @Get('/list')
  async findAll() {
    return this.primaryMaterialService.findAll({
      where: {},
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.primaryMaterialService.findOne({
      id,
    });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePrimaryMaterialDto: UpdatePrimaryMaterialDto,
  ) {
    return this.primaryMaterialService.update(id, updatePrimaryMaterialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.primaryMaterialService.remove(id);
  }
}
