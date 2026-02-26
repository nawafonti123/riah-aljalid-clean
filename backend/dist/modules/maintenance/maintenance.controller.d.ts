import { MaintenanceService } from './maintenance.service';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';
export declare class MaintenanceController {
    private readonly maintenanceService;
    constructor(maintenanceService: MaintenanceService);
    getStatus(): Promise<any>;
    updateStatus(dto: UpdateMaintenanceDto): Promise<any>;
}
