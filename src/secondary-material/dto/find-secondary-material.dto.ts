export class FindAllSecondaryMaterialDto {
  // 食材名称
  name?: string;
  // 食材所属的二级分类id
  secondaryMaterialId?: number;
  // 所属的一级分类id
  primaryMaterialId?: number;
  // 包含的基础材料id
  baseMaterialIds?: number[];
}
