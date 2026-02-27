// backend/src/modules/settings/settings.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async get() {
    const setting = await this.prisma.setting.findFirst();
    if (!setting) {
      return this.prisma.setting.create({
        data: {
          phone: '',
          email: '',
          address: '',
          commercialRegister: '',
          whyUsImage: null,
          aboutImage: null,
          footerIceImage: null,
          googleMapsEmbedUrl: null,
        },
      });
    }
    return setting;
  }

  async update(updateSettingDto: UpdateSettingDto) {
    return this.prisma.setting.update({
      where: { id: (await this.get()).id },
      data: updateSettingDto,
    });
  }
}