export class UpdateSettingDto {
  phone?: string;
  email?: string;
  address?: string;
  commercialRegister?: string;

  // صور/محتوى صفحات عامة
  whyUsImage?: string | null;
  aboutImage?: string | null;
  footerIceImage?: string | null;
  googleMapsEmbedUrl?: string | null;
}