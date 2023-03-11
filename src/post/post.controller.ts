import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PostService } from './post.service';
import { RBACGuard } from '../common/guards/rbac/rbac.guard';
import { RoleConstants } from '../common/auth/constants';

import { Post as PostModel } from '@prisma/client';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findPost(@Param() param: { id: number }) {
    return this.postService.post(Number(param.id));
  }

  // @UseGuards(new RBACGuard(RoleConstants.ADMIN))
  // @UseGuards(AuthGuard('jwt'))
  // @Post()
  // async createPost(@Body() body: any) {
  //   return this.postService.createPost({
  //     title: body.title,
  //     content: body.content,
  //     author: +body.authorId as any,
  //   });
  // }

  @UseGuards(new RBACGuard(RoleConstants.ADMIN))
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createPost(
    @Body() postData: { title: string; content?: string; authorId: string },
  ): Promise<PostModel> {
    const { title, content, authorId } = postData;
    return this.postService.createPost({
      title,
      content,
      author: {
        connect: { id: +authorId },
      },
    });
  }
}
