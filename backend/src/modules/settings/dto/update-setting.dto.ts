import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateSettingDto {
  // ======================
  // Contact / Info
  // ======================
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

  @IsOptional()
  @IsString()
  googleMapsEmbedUrl?: string | null;

  // ======================
  // Section Images (Admin Controlled)
  // ======================
  @IsOptional()
  @IsString()
  whyUsImage?: string | null;

  @IsOptional()
  @IsString()
  aboutImage?: string | null;

  @IsOptional()
  @IsString()
  footerIceImage?: string | null;

  // ✅ NEW: صورة لقسم الخدمات
  @IsOptional()
  @IsString()
  servicesImage?: string | null;

  // ✅ NEW: صورة لقسم أعمالنا
  @IsOptional()
  @IsString()
  portfolioImage?: string | null;

  // ✅ NEW: صورة لقسم اتصل بنا (اختياري)
  @IsOptional()
  @IsString()
  contactImage?: string | null;

  // ✅ NEW: صورة لقسم الأسئلة الشائعة
  @IsOptional()
  @IsString()
  faqImage?: string | null;

  // ✅ NEW: صورة لقسم خطوات العمل
  @IsOptional()
  @IsString()
  processImage?: string | null;

  // ✅ NEW: صورة لقسم الشركاء/العلامات التجارية
  @IsOptional()
  @IsString()
  brandsImage?: string | null;
}