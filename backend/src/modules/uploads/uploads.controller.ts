import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/uploads')
export class UploadsController {

  // ✅ رفع صورة
  @Post('image')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_, file, callback) => {
          const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
          callback(null, uniqueName);
        },
      }),
    }),
  )
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return {
      url: `${process.env.BACKEND_URL}/uploads/${file.filename}`,
    };
  }

  // ✅ رفع فيديو
  @Post('video')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_, file, callback) => {
          const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
          callback(null, uniqueName);
        },
      }),
    }),
  )
  uploadVideo(@UploadedFile() file: Express.Multer.File) {
    return {
      url: `${process.env.BACKEND_URL}/uploads/${file.filename}`,
    };
  }
}