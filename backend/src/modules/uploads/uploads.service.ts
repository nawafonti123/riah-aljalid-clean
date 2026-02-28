import { Injectable, BadRequestException } from '@nestjs/common';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { existsSync } from 'fs';

@Injectable()
export class UploadsService {
  private readonly uploadDir = process.env.UPLOAD_DIR || '/uploads';
  // استخدم BACKEND_URL من متغيرات البيئة، مع قيمة افتراضية للتطوير المحلي
  private readonly baseUrl = process.env.BACKEND_URL || 'http://localhost:4000';

  constructor() {
    if (!existsSync(this.uploadDir)) {
      mkdir(this.uploadDir, { recursive: true });
    }
  }

  async uploadFile(file: Express.Multer.File, type: 'image' | 'video'): Promise<string> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const allowedMimeTypes = type === 'image'
      ? ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
      : ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(`Invalid file type. Allowed ${type} types: ${allowedMimeTypes.join(', ')}`);
    }

    const fileExtension = file.originalname.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const filePath = join(this.uploadDir, fileName);

    await writeFile(filePath, file.buffer);

    // إرجاع الرابط الكامل باستخدام baseUrl
    return `${this.baseUrl}/uploads/${fileName}`;
  }
}
