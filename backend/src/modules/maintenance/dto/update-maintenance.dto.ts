// backend/src/modules/maintenance/dto/update-maintenance.dto.ts
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateMaintenanceDto {
  @IsOptional()
  @IsBoolean()
  isEnabled?: boolean;

  @IsOptional()
  @IsString()
  message?: string;
}