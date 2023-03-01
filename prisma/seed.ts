import { PrismaClient } from '@prisma/client';
import * as process from 'process';

// 初始化 prismaClient
const prisma = new PrismaClient();

async function main() {
  // 此处编写 prismaClient 操作数据库的逻辑，新增/查询/删除
  await prisma.user.create({
    data: {
      name: 'iamzhoufei',
      email: 'ursazoo@gmail.com',
    },
  });

  await prisma.post.create({
    data: {
      title: '黄豆焖双蹄',
      content: '<div>从入门到精通</div>',
      authorId: 1,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // 关闭 prisma 连接
    await prisma.$disconnect();
  });
