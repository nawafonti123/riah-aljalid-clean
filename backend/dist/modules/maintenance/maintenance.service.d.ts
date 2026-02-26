import { PrismaService } from '../../prisma/prisma.service';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';
export declare class MaintenanceService {
    private prisma;
    constructor(prisma: PrismaService);
    getStatus(): Promise<any>;
    updateStatus(dto: UpdateMaintenanceDto): Promise<any>;
}
