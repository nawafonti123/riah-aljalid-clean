import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as compression from 'compression';
import { ValidationPipe } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.Console({ format: format.simple() }),
      ],
    }),
  });

  app.use(json({ limit: '10mb' }));

  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  );

  app.use(compression());

  // إعدادات CORS معدلة - الأهم هنا
  app.enableCors({
    origin: (origin, callback) => {
      // قائمة بالأصول المسموح بها (بدون شرطة مائلة في النهاية)
      const allowedOrigins = [
        'http://localhost:3000',
        process.env.FRONTEND_URL?.replace(/\/$/, ''), // نزيل أي شرطة مائلة في النهاية
      ].filter(Boolean); // نزيل أي قيم فارغة

      // إذا كان الطلب من أصل مسموح به أو لم يكن هناك أصل (طلب من Postman مثلًا)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
