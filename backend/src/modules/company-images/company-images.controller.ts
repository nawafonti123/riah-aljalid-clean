// backend/src/modules/company-images/company-images.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { CompanyImagesService } from './company-images.service';
import { CreateCompanyImageDto, UpdateCompanyImageDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('company-images')
export class CompanyImagesController {
  constructor(private readonly companyImagesService: CompanyImagesService) {}

  @Get()
  findAll() {
    return this.companyImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyImagesService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'EDITOR')
  create(@Body() createDto: CreateCompanyImageDto) {
    return this.companyImagesService.create(createDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'EDITOR')
  update(@Param('id') id: string, @Body() updateDto: UpdateCompanyImageDto) {
    return this.companyImagesService.update(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.companyImagesService.remove(id);
  }
}