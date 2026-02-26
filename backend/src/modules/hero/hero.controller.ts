import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { HeroService } from './hero.service';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('hero')
export class HeroController {
  constructor(private heroService: HeroService) {}

  @Get()
  get() {
    return this.heroService.get();
  }

  @Put()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  update(@Body() updateHeroDto: UpdateHeroDto) {
    return this.heroService.update(updateHeroDto);
  }
}
