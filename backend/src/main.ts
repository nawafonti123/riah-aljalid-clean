import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'https://riah-aljalid-clean-4cog.vercel.app',
      'https://www.riah-aljalid.com'
    ],
    credentials: true,
  });

  // ✅ مهم جداً: اجعل uploads public
  app.use(
    '/uploads',
    express.static(path.join(process.cwd(), 'uploads')),
  );

  await app.listen(process.env.PORT || 3000);
}
bootstrap();