import { PartialType } from "@nestjs/mapped-types";
import { CreatePrimaryMaterialDto } from "./create-primary-material.dto";

export class UpdatePrimaryMaterialDto extends PartialType(
  CreatePrimaryMaterialDto
) {
  // name: string;

  secondaryMaterialIds?: number[];
}
