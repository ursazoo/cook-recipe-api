import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { SecondaryMaterialService } from "./secondary-material.service";
import { CreateSecondaryMaterialDto } from "./dto/create-secondary-material.dto";
import { UpdateSecondaryMaterialDto } from "./dto/update-secondary-material.dto";
import { FindAllSecondaryMaterialDto } from "./dto/find-secondary-material.dto";

@Controller("secondary-material")
export class SecondaryMaterialController {
  constructor(
    private readonly secondaryMaterialService: SecondaryMaterialService
  ) {
  }

  @Post("create")
  async create(@Body() createSecondaryMaterialDto: CreateSecondaryMaterialDto) {
    return this.secondaryMaterialService.create(createSecondaryMaterialDto);
  }

  @Get("list")
  async findAll(@Query() query: FindAllSecondaryMaterialDto) {
    return this.secondaryMaterialService.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.secondaryMaterialService.findOne({
      id
    });
  }

  @Patch(":id")
  update(
    @Param("id") id: number,
    @Body() updateSecondaryMaterialDto: UpdateSecondaryMaterialDto
  ) {
    return this.secondaryMaterialService.update(id, updateSecondaryMaterialDto);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.secondaryMaterialService.remove(id);
  }
}
