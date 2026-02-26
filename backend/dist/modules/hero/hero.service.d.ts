import { PrismaService } from '../../prisma/prisma.service';
import { UpdateHeroDto } from './dto/update-hero.dto';
export declare class HeroService {
    private prisma;
    constructor(prisma: PrismaService);
    get(): Promise<{
        id: string;
        title: string;
        subtitle: string;
        backgroundImage: string | null;
    }>;
    update(updateHeroDto: UpdateHeroDto): Promise<{
        id: string;
        title: string;
        subtitle: string;
        backgroundImage: string | null;
    }>;
}
