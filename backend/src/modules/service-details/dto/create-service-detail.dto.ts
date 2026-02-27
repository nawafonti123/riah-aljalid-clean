import { IsString, IsOptional, IsNumber, IsUrl, IsNotEmpty, Min } from 'class-validator';

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
  @Min(0)
  order: number;

  @IsString()
  @IsNotEmpty()
  serviceId: string;
}