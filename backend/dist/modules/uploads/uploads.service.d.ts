export declare class UploadsService {
    private readonly uploadDir;
    private readonly baseUrl;
    constructor();
    uploadFile(file: Express.Multer.File, type: 'image' | 'video'): Promise<string>;
}
