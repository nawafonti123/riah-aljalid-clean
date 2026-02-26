import { SettingsService } from './settings.service';
import { UpdateSettingDto } from './dto/update-setting.dto';
export declare class SettingsController {
    private settingsService;
    constructor(settingsService: SettingsService);
    get(): Promise<{
        id: string;
        email: string;
        phone: string;
        address: string;
        commercialRegister: string;
    }>;
    update(updateSettingDto: UpdateSettingDto): Promise<{
        id: string;
        email: string;
        phone: string;
        address: string;
        commercialRegister: string;
    }>;
}
