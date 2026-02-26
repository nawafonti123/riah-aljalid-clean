// backend/src/modules/hero/hero.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateHeroDto } from './dto/update-hero.dto';

@Injectable()
export class HeroService {
  constructor(private prisma: PrismaService) {}

  async get() {
    const hero = await this.prisma.hero.findFirst();
    if (!hero) {
      return this.prisma.hero.create({
        data: {
          title: 'رياح الجليد',
          subtitle: 'حلول تبريد متكاملة',
        },
      });
    }
    return hero;
  }

  async update(updateHeroDto: UpdateHeroDto) {
    return this.prisma.hero.update({
      where: { id: (await this.get()).id },
      data: updateHeroDto,
    });
  }
}