// backend/src/modules/settings/settings.service.ts

import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Injectable()
export class SettingsService {
  private readonly logger = new Logger(SettingsService.name);

  constructor(private prisma: PrismaService) {}

  private defaults() {
    return {
      phone: '+966 56 524 7407',
      email: 'RiaHaljalid@icloud.com',
      address:
        '8246 طريق الملك عبدالعزيز الفرعي، الملك فهد، 3988، الرياض 12274، المملكة العربية السعودية',
      commercialRegister: '1010632725',
      googleMapsEmbedUrl:
        'https://www.google.com/maps?q=8246%20%D8%B7%D8%B1%D9%8A%D9%82%20%D8%A7%D9%84%D9%85%D9%84%D9%83%20%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D8%B9%D8%B2%D9%8A%D8%B2%20%D8%A7%D9%84%D9%81%D8%B1%D8%B9%D9%8A&output=embed',

      // صور الأقسام (اختياري)
      whyUsImage: null,
      aboutImage: null,
      footerIceImage: null,
      servicesImage: null,
      portfolioImage: null,
      contactImage: null,
      faqImage: null,
      processImage: null,
      brandsImage: null,
    };
  }

  async get() {
    try {
      const existing = await this.prisma.setting.findFirst();
      if (existing) return existing;

      // ✅ أهم سطر: لو ما فيه أي سجل، ننشئ واحد افتراضي عشان ما يصير 500
      return await this.prisma.setting.create({
        data: this.defaults(),
      });
    } catch (err: any) {
      this.logger.error('GET /settings failed', err?.stack || err);
      throw new InternalServerErrorException('Failed to load settings');
    }
  }

  async update(dto: UpdateSettingDto) {
    try {
      const existing = await this.prisma.setting.findFirst();
      const base = this.defaults();

      // تنظيف الـ undefined (خلي Prisma ما يلمس الحقول اللي ما أرسلتها)
      const data: any = {};
      for (const [k, v] of Object.entries(dto as Record<string, any>)) {
        if (v !== undefined) data[k] = v;
      }

      // ✅ لو ما فيه سجل: نسوي create مع دمج defaults + dto
      if (!existing) {
        return await this.prisma.setting.create({
          data: {
            ...base,
            ...data,

            // ضمان الحقول الإلزامية ما تصير null/undefined
            phone: (data.phone ?? base.phone) as string,
            email: (data.email ?? base.email) as string,
            address: (data.address ?? base.address) as string,
            commercialRegister: (data.commercialRegister ?? base.commercialRegister) as string,
          },
        });
      }

      return await this.prisma.setting.update({
        where: { id: existing.id },
        data,
      });
    } catch (err: any) {
      this.logger.error('PUT /settings failed', err?.stack || err);
      throw new InternalServerErrorException('Failed to update settings');
    }
  }
}