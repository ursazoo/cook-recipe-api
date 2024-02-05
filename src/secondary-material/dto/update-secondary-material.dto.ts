import { PartialType } from "@nestjs/mapped-types";
import { CreateSecondaryMaterialDto } from "./create-secondary-material.dto";

export class UpdateSecondaryMaterialDto extends PartialType(
  CreateSecondaryMaterialDto
) {
  name: string;
  baseMaterialIds: number[];
}
