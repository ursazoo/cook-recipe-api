export const JwtConstants = {
  secret: "rabbitking1117" // 秘钥
};

export const RoleConstants = {
  SUPER_ADMIN: 0, // 超级管理员
  ADMIN: 1, // 管理员
  DEVELOPER: 2, // 开发者（测试、运营具有同一权限，若提升为 RBAC 1 以上，则可酌情分开）
  USER: 3 // 普通用户
};
