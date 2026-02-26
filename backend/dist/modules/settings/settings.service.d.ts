import { PrismaService } from '../../prisma/prisma.service';
import { UpdateSettingDto } from './dto/update-setting.dto';
export declare class SettingsService {
    private prisma;
    constructor(prisma: PrismaService);
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
