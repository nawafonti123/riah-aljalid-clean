"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const throttler_1 = require("@nestjs/throttler");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const configuration_1 = require("./config/configuration");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const projects_module_1 = require("./modules/projects/projects.module");
const services_module_1 = require("./modules/services/services.module");
const uploads_module_1 = require("./modules/uploads/uploads.module");
const hero_module_1 = require("./modules/hero/hero.module");
const settings_module_1 = require("./modules/settings/settings.module");
const activity_log_module_1 = require("./modules/activity-log/activity-log.module");
const contact_module_1 = require("./modules/contact/contact.module");
const maintenance_module_1 = require("./modules/maintenance/maintenance.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(process.cwd(), 'uploads'),
                serveRoot: '/uploads',
                serveStaticOptions: {
                    setHeaders: (res, path, stat) => {
                        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                        res.setHeader('Access-Control-Allow-Credentials', 'true');
                    },
                },
            }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default],
                envFilePath: '.env',
            }),
            throttler_1.ThrottlerModule.forRoot([
                {
                    ttl: 60,
                    limit: 10,
                },
            ]),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            projects_module_1.ProjectsModule,
            services_module_1.ServicesModule,
            uploads_module_1.UploadsModule,
            hero_module_1.HeroModule,
            settings_module_1.SettingsModule,
            activity_log_module_1.ActivityLogModule,
            contact_module_1.ContactModule,
            maintenance_module_1.MaintenanceModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map