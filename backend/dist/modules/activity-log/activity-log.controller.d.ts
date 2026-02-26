import { ActivityLogService } from './activity-log.service';
export declare class ActivityLogController {
    private activityLogService;
    constructor(activityLogService: ActivityLogService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        user: {
            id: string;
            email: string;
            password: string;
            role: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        userId: string;
        action: string;
        timestamp: Date;
    })[]>;
}
