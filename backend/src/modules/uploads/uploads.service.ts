import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class UploadsService {
  constructor(@Inject('CLOUDINARY') private readonly _cloudinary: typeof cloudinary) {}

  async uploadFile(file: Express.Multer.File, type: 'image' | 'video'): Promise<string> {
    if (!file) throw new BadRequestException('No file provided');

    const allowedMimeTypes =
      type === 'image'
        ? ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
        : ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(`Invalid file type. Allowed ${type} types: ${allowedMimeTypes.join(', ')}`);
    }

    const resourceType = type === 'video' ? 'video' : 'image';

    const result = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'riah-aljalid',
          resource_type: resourceType,
        },
        (error, res) => {
          if (error) return reject(error);
          resolve(res);
        }
      );

      stream.end(file.buffer);
    });

    return result.secure_url as string;
  }
}