// backend/src/modules/company-images/company-images.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCompanyImageDto } from './dto/create-company-image.dto';
import { UpdateCompanyImageDto } from './dto/update-company-image.dto';

@Injectable()
export class CompanyImagesService {
  constructor(private prisma: PrismaService) {}

  create(createDto: CreateCompanyImageDto) {
    return this.prisma.companyImage.create({ data: createDto });
  }

  findAll() {
    return this.prisma.companyImage.findMany({ orderBy: { order: 'asc' } });
  }

  findOne(id: string) {
    return this.prisma.companyImage.findUnique({ where: { id } });
  }

  update(id: string, updateDto: UpdateCompanyImageDto) {
    return this.prisma.companyImage.update({ where: { id }, data: updateDto });
  }

  remove(id: string) {
    return this.prisma.companyImage.delete({ where: { id } });
  }
}