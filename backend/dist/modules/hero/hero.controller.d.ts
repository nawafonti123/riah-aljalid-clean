import { HeroService } from './hero.service';
import { UpdateHeroDto } from './dto/update-hero.dto';
export declare class HeroController {
    private heroService;
    constructor(heroService: HeroService);
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
