// backend/src/prisma/prisma.service.ts
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private static pool: Pool;

  constructor() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL is missing');
    }

    // ✅ reuse pool (أفضل للأداء على السيرفر)
    if (!PrismaService.pool) {
      PrismaService.pool = new Pool({ connectionString });
    }

    const adapter = new PrismaPg(PrismaService.pool);

    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
    // لا نسكر الـ pool هنا عشان ما يسبب مشاكل في hot reload/instances
  }
}