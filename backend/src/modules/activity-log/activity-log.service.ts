import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ActivityLogService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.activityLog.findMany({
      include: { user: true },
      orderBy: { timestamp: 'desc' },
    });
  }
}
