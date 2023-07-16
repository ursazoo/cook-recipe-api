import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CookwareService } from './cookware.service';
import { CreateCookwareDto } from './dto/create-cookware.dto';
import { UpdateCookwareDto } from './dto/update-cookware.dto';

@Controller('cookware')
export class CookwareController {
  constructor(private readonly cookwareService: CookwareService) {}

  @Post('create')
  async create(@Body() createCookwareDto: CreateCookwareDto) {
    return this.cookwareService.create(createCookwareDto);
  }

  @Get('/list')
  async findAll() {
    return this.cookwareService.findAll({
      where: {},
    });
  }

  @Get('/structured-list')
  async findStructuredList() {
    return this.cookwareService.findStructuredList();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.cookwareService.findOne({
      id,
    });
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateCookwareDto: UpdateCookwareDto,
  ) {
    return this.cookwareService.update(id, updateCookwareDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.cookwareService.remove(id);
  }
}
