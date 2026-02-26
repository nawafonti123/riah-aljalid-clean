import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        category: string | null;
        isFeatured: boolean;
        images: string[];
        videos: string[];
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__ProjectClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        category: string | null;
        isFeatured: boolean;
        images: string[];
        videos: string[];
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    create(createProjectDto: CreateProjectDto): import(".prisma/client").Prisma.Prisma__ProjectClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        category: string | null;
        isFeatured: boolean;
        images: string[];
        videos: string[];
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateProjectDto: UpdateProjectDto): import(".prisma/client").Prisma.Prisma__ProjectClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        category: string | null;
        isFeatured: boolean;
        images: string[];
        videos: string[];
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__ProjectClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        category: string | null;
        isFeatured: boolean;
        images: string[];
        videos: string[];
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
