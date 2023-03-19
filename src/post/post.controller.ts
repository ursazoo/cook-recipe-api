import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PostService } from './post.service';
import { RBACGuard } from '../common/guards/rbac/rbac.guard';
import { RoleConstants } from '../common/auth/constants';
import { CreatePostDto } from './dto/create-post.dto';

// import { Post as PostModel } from '@prisma/client';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findPost(@Param() param: { id: string }) {
    return this.postService.findPost({
      id: param.id,
    });
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

  // 创建菜谱
  // @UseGuards(new RBACGuard(RoleConstants.ADMIN))
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createPost(@Body() createPostDto: CreatePostDto) {
    return this.postService.createPost(createPostDto);
  }

  // @UseGuards(AuthGuard('jwt'))
  // @Get()
  // async findAllPost() {
  //   return this.postService.findAllPost({where: {}});
  // }
}
