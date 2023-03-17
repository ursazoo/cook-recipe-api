export class CreateSecondaryMaterialDto {
  name: string;

  color: string;

  // 所属的食材一级分类
  primaryMaterialId: string;

  // 包含的食材标签id
  // baseMaterialIdList?: string[];
}
