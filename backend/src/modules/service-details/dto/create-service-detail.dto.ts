import { IsString, IsOptional, IsNumber, IsUrl, IsNotEmpty } from 'class-validator';

export class CreateServiceDetailDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsUrl()
  image?: string;

  @IsNumber()
  order: number;

  @IsString()
  @IsNotEmpty()
  serviceId: string;
}