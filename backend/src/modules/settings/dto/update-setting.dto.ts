import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateSettingDto {
  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  commercialRegister?: string;

  // ✅ NEW: صور/محتوى صفحات عامة
  @IsOptional()
  @IsString()
  whyUsImage?: string | null;

  @IsOptional()
  @IsString()
  aboutImage?: string | null;

  @IsOptional()
  @IsString()
  footerIceImage?: string | null;

  @IsOptional()
  @IsString()
  googleMapsEmbedUrl?: string | null;
}