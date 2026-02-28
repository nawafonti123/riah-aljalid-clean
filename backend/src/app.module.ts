import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import configuration from './config/configuration';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { ServicesModule } from './modules/services/services.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { HeroModule } from './modules/hero/hero.module';
import { SettingsModule } from './modules/settings/settings.module';
import { ActivityLogModule } from './modules/activity-log/activity-log.module';
import { ContactModule } from './modules/contact/contact.module';
import { MaintenanceModule } from './modules/maintenance/maintenance.module';
import { TeamModule } from './modules/team/team.module';
import { ServiceDetailsModule } from './modules/service-details/service-details.module';
import { CompanyImagesModule } from './modules/company-images/company-images.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'uploads'),
    serveRoot: '/uploads',
    serveStaticOptions: {
      setHeaders: (res) => {
        res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'http://localhost:3000');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
      },
    },
  }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: '.env',
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 10,
      },
    ]),
    PrismaModule,
    AuthModule,
    UsersModule,
    ProjectsModule,
    ServicesModule,
    UploadsModule,
    HeroModule,
    SettingsModule,
    ActivityLogModule,
    ContactModule,
    MaintenanceModule,
    TeamModule,
    ServiceDetailsModule,
    CompanyImagesModule,
  ],
})
export class AppModule {}