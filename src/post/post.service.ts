import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { DatabaseService } from '../common/database/database.service';
import { CreatePostDto, FindAllPostDto, EditPostDto } from './dto';

@Injectable()
export class PostService {
  constructor(private prisma: DatabaseService) {}

  // async post(
  //   postWhereUniqueInput: Prisma.PostWhereUniqueInput,
  // ): Promise<Post | null> {
  //   return this.prisma.post
  //     .findUnique({
  //       where: postWhereUniqueInput,
  //     })
  //     .then((res) => {
  //       console.logs('=====res====');
  //       console.logs(res);
  //       return res;
  //     })
  //     .catch((error) => {
  //       console.logs(error);
  //       return error;
  //     });
  // }
  // async post(id: number): Promise<Post | null> {
  //   return this.prisma.post.findUnique({
  //     where: {
  //       id,
  //     },
  //   });
  // }

  async findPost({ id, title }: { title?: string; id?: string }) {
    const post = await this.prisma.post.findUnique({
      where: {
        id,
        title,
      },
      select: {
        id: true,
        title: true,
        content: true,
        cookwareList: true,
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        baseMaterialList: {
          select: {
            id: true,
            name: true,
            emoji: true,
            secondaryMaterial: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return {
      data: post,
    };
  }

  async posts(
    findAllPostDto: FindAllPostDto,
  ): Promise<{ data: { list: any } }> {
    const where: any = {};

    const titleQuery = {
      contains: findAllPostDto.title,
    };

    const authorIdQuery = {
      contains: findAllPostDto.authorId,
    };

    const baseMaterialListQuery = {
      some: {
        id: {
          in: findAllPostDto.baseMaterialIds,
        },
      },
    };

    const cookwareListQuery = {
      some: {
        id: {
          in: findAllPostDto.cookwareIds,
        },
      },
    };

    if (findAllPostDto?.title) {
      where.title = titleQuery;
    }

    if (findAllPostDto?.authorId) {
      where.authorId = authorIdQuery;
    }

    if (findAllPostDto?.baseMaterialIds?.length) {
      where.baseMaterialList = baseMaterialListQuery;
    }

    if (findAllPostDto?.cookwareIds?.length) {
      where.cookwareList = cookwareListQuery;
    }

    const select: any = {
      id: true,
      title: true,
      author: {
        select: {
          id: true,
          name: true,
        },
      },
    };

    if (findAllPostDto.withDetail) {
      select.cookwareList = true;
      select.baseMaterialList = {
        select: {
          id: true,
          name: true,
          emoji: true,
        },
      };
    }

    const result = await this.prisma.post.findMany({
      skip: findAllPostDto.pageSize * (findAllPostDto.pageNum - 1),
      take: findAllPostDto.pageSize,
      orderBy: {
        title: 'asc',
      },
      where,
      select,
    });
    return {
      data: { list: result },
    };
  }

  async createPost(createPostDto: CreatePostDto) {
    const post = await this.findPost({
      title: createPostDto.title,
    });

    if (post.data) {
      return {
        success: false,
        message: '当前菜谱已存在',
      };
    }

    try {
      const createdPost = await this.prisma.post.create({
        data: {
          title: createPostDto.title,
          content: createPostDto.content,
          published: createPostDto.published,
          author: {
            connect: { id: createPostDto.authorId },
          },
          baseMaterialList: {
            connect: createPostDto.baseMaterialIds.map((item) => ({
              id: item,
            })),
          },
          cookwareList: {
            connect: createPostDto.cookwareIds.map((item) => ({
              id: item,
            })),
          },
        },
        include: {
          author: true,
          baseMaterialList: true, // Include all posts in the returned object
          cookwareList: true,
        },
      });

      return {
        data: null,
        message: '添加菜谱成功',
      };
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  }

  async editPost(params: {
    where: Prisma.PostWhereUniqueInput;
    editPostDto: EditPostDto;
  }) {
    const { editPostDto } = params;
    await this.prisma.post.update({
      where: {
        id: editPostDto.id,
      },
      data: {
        author: {
          connect: { id: editPostDto.authorId },
        },
        baseMaterialList: {
          connect: editPostDto.baseMaterialIds.map((id) => ({ id })),
        },
        cookwareList: {
          connect: editPostDto.cookwareIds.map((id) => ({ id })),
        },
      },
    });

    return {
      data: null,
    };
  }

  async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    return this.prisma.post.delete({
      where,
    });
  }

  async viewPost(params: { where: Prisma.PostWhereUniqueInput }) {
    const { where } = params;
    await this.prisma.post.update({
      where,
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });

    return {
      data: null,
    };
  }
}
