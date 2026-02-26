import { Controller, Get, UseGuards } from '@nestjs/common';
import { ActivityLogService } from './activity-log.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('activity-log')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ActivityLogController {
  constructor(private activityLogService: ActivityLogService) {}

  @Get()
  @Roles('ADMIN')
  findAll() {
    return this.activityLogService.findAll();
  }
}
