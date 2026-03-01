import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      process.env.FRONTEND_URL,           // الدومين الأساسي
      'https://www.riah-aljalid.com',     // احتياط
      'https://riah-aljalid.com'          // بدون www احتياط
    ],
    credentials: true,
  });

  // ✅ جعل مجلد uploads public
  app.use(
    '/uploads',
    express.static(path.join(process.cwd(), 'uploads')),
  );

  await app.listen(process.env.PORT || 3000);
}
bootstrap();