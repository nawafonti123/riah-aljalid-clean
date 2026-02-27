// backend/src/modules/team/team.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTeamDto, UpdateTeamDto } from './dto';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  create(createDto: CreateTeamDto) {
    return this.prisma.teamMember.create({ data: createDto });
  }

  findAll() {
    return this.prisma.teamMember.findMany({ orderBy: { order: 'asc' } });
  }

  findOne(id: string) {
    return this.prisma.teamMember.findUnique({ where: { id } });
  }

  update(id: string, updateDto: UpdateTeamDto) {
    return this.prisma.teamMember.update({ where: { id }, data: updateDto });
  }

  remove(id: string) {
    return this.prisma.teamMember.delete({ where: { id } });
  }
}