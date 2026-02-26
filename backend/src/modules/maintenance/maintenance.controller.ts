// backend/src/modules/maintenance/maintenance.controller.ts
import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('maintenance')
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @Get()
  async getStatus() {
    return this.maintenanceService.getStatus();
  }

  @Patch()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  async updateStatus(@Body() dto: UpdateMaintenanceDto) {
    return this.maintenanceService.updateStatus(dto);
  }
}