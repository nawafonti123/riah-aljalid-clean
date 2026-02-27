import { IsString, IsOptional, IsNumber, IsUrl, Min } from 'class-validator';

export class CreateCompanyImageDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsUrl()
  image: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsNumber()
  @Min(0)
  order: number;
}