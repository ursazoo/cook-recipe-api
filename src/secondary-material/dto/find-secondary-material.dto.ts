export class FindAllSecondaryMaterialDto {
  // 食材名称
  name?: string;
  // 食材所属的二级分类id
  secondaryMaterialId?: string;
  // 所属的一级分类id
  primaryMaterialId?: string;
  // 包含的基础材料id
  baseMaterialIds?: string[];
}
