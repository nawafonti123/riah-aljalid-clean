import { PrismaService } from '../../prisma/prisma.service';
export declare class ActivityLogService {
    private prisma;
    constructor(prisma: PrismaService);
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
