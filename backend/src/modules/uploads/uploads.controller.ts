// backend/src/modules/uploads/uploads.controller.ts
import { Controller, Post, UseInterceptors, UploadedFile, UseGuards, BadRequestException, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadsService } from './uploads.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('uploads')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UploadsController {
  constructor(private uploadsService: UploadsService) {}

  @Post('image')
  @Roles('ADMIN', 'EDITOR')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    try {
      const url = await this.uploadsService.uploadFile(file, 'image');
      return { url };
    } catch (error) {
      throw new BadRequestException('Failed to upload image: ' + error.message);
    }
  }

  @Post('video')
  @Roles('ADMIN', 'EDITOR')
  @UseInterceptors(FileInterceptor('file'))
  async uploadVideo(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    try {
      const url = await this.uploadsService.uploadFile(file, 'video');
      return { url };
    } catch (error) {
      throw new BadRequestException('Failed to upload video: ' + error.message);
    }
  }
}