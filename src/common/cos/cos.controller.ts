// app.controller.ts

import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CosService } from './cos.service';

@Controller('cos')
export class CosController {
  constructor(private cosService: CosService) {}

  @Post('init')
  async init() {
    return this.cosService.init();
  }

  @Post('upload') // 图片上传
  @UseInterceptors(FilesInterceptor('file'))
  async uploadImages(@UploadedFiles() file) {
    const url = await this.cosService.uploadAssets(file);

    // console.log('=======result url');
    // console.log(url);

    return {
      images: [
        {
          url,
          ref: null,
        },
      ],
    };
  }
}
