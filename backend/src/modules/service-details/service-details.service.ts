import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateServiceDetailDto } from './dto/create-service-detail.dto';
import { UpdateServiceDetailDto } from './dto/update-service-detail.dto';
@Injectable()
export class ServiceDetailsService {
  constructor(private prisma: PrismaService) {}

  create(createDto: CreateServiceDetailDto) {
    return this.prisma.serviceDetail.create({ data: createDto });
  }

  findAll() {
    return this.prisma.serviceDetail.findMany({ orderBy: { order: 'asc' } });
  }

  findOne(id: string) {
    return this.prisma.serviceDetail.findUnique({ where: { id } });
  }

  update(id: string, updateDto: UpdateServiceDetailDto) {
    return this.prisma.serviceDetail.update({ where: { id }, data: updateDto });
  }

  remove(id: string) {
    return this.prisma.serviceDetail.delete({ where: { id } });
  }
}