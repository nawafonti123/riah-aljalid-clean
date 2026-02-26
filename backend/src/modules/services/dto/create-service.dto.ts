import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  icon: string;

  @IsOptional()
  @IsInt()
  order?: number;
}