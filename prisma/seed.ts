import { PrismaClient } from '@prisma/client';
import * as process from 'process';

// 初始化 prismaClient
const prisma = new PrismaClient();

async function main() {
  // 此处编写 prismaClient 操作数据库的逻辑，新增/查询/删除
  await prisma.user.create({
    data: {
      name: 'iamzhoufei',
      email: 'ursazoo12ß@gmail.com',
      password: '123456',
    },
  });

  await prisma.post.create({
    data: {
      title: '鸡腿娃娃菜',
      content: '<div>从入门到精通</div>',
      author: {
        create: {
          name: 'faker',
          email: 'faker@gmail.com',
          password: '123456',
        },
      },
      ingredients: {
        create: [
          {
            name: '娃娃菜',
            emoji: '',
            ingredientSubType: {
              create: {
                name: '叶菜/花菜',
                ingredientType: {
                  create: {
                    name: '绿叶蔬菜',
                  },
                },
              },
            },
          },
          {
            name: '鸡腿肉',
            emoji: '',
            ingredientSubType: {
              create: {
                name: '鸡鸭鸽',
                ingredientType: {
                  create: {
                    name: '肉禽蛋品',
                  },
                },
              },
            },
          },
        ],
      },
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
