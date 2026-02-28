import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  private defaults() {
    return {
      phone: '+966 56 524 7407',
      email: 'RiaHaljalid@icloud.com',
      address: '8246 طريق الملك عبدالعزيز الفرعي، الملك فهد، 3988، الرياض 12274، المملكة العربية السعودية',
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
    const existing = await this.prisma.setting.findFirst();
    if (existing) return existing;

    // ✅ لو ما في أي سجل: أنشئ سجل افتراضي
    return this.prisma.setting.create({
      data: this.defaults(),
    });
  }

  async update(dto: UpdateSettingDto) {
    const existing = await this.prisma.setting.findFirst();
    const base = this.defaults();

    // ✅ Upsert منطقي حتى لو ما في سجل
    if (!existing) {
      return this.prisma.setting.create({
        data: {
          ...base,
          ...dto,
          // ضمان عدم إدخال null بالحقول الإلزامية
          phone: (dto.phone ?? base.phone) as string,
          email: (dto.email ?? base.email) as string,
          address: (dto.address ?? base.address) as string,
          commercialRegister: (dto.commercialRegister ?? base.commercialRegister) as string,
        },
      });
    }

    return this.prisma.setting.update({
      where: { id: existing.id },
      data: dto,
    });
  }
}