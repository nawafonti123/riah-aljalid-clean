// backend/src/modules/maintenance/maintenance.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';

@Injectable()
export class MaintenanceService {
  constructor(private prisma: PrismaService) {}

  /**
   * الحصول على حالة الصيانة
   * ملاحظة: بسبب مشكلة في توليد Prisma Client (خصوصاً مع Prisma v7)،
   * نستخدم `as any` مؤقتاً إلى أن يتم حل المشكلة وتوليد العميل بشكل صحيح.
   * بعد تشغيل `npx prisma generate` بنجاح، يمكن إزالة `as any`.
   */
  async getStatus() {
    // استخدام as any مؤقتاً لحين حل مشكلة التوليد
    const maintenance = await (this.prisma as any).maintenance.findFirst();
    if (!maintenance) {
      return (this.prisma as any).maintenance.create({
        data: {},
      });
    }
    return maintenance;
  }

  /**
   * تحديث حالة الصيانة
   */
  async updateStatus(dto: UpdateMaintenanceDto) {
    const maintenance = await this.getStatus();
    return (this.prisma as any).maintenance.update({
      where: { id: maintenance.id },
      data: dto,
    });
  }
}