export class CreateBaseMaterialDto {
  // 食材名称
  name: string;
  // 食材所属的二级分类id
  secondaryMaterialId: string;
  // emoji表情
  emoji?: string;
  // 选择次数
  count?: number;

  color: string;
}
