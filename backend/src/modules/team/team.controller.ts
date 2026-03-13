import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto, UpdateTeamDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  findAll() {
    return this.teamService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'EDITOR')
  create(@Body() createDto: CreateTeamDto) {
    return this.teamService.create(createDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'EDITOR')
  update(@Param('id') id: string, @Body() updateDto: UpdateTeamDto) {
    return this.teamService.update(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'EDITOR')
  remove(@Param('id') id: string) {
    return this.teamService.remove(id);
  }
}