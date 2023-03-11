import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { DatabaseService } from '../common/database/database.service';

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
  async post(id: number): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: {
        id,
      },
    });
  }

  async posts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<Post[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.post.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createPost(data: Prisma.PostCreateInput): Promise<Post> {
    return this.prisma.post.create({
      data,
    });
  }

  async updatePost(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }): Promise<Post> {
    const { data, where } = params;
    return this.prisma.post.update({
      data,
      where,
    });
  }

  async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    return this.prisma.post.delete({
      where,
    });
  }
}
