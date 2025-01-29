import path, { join } from "path";
import { existsSync, mkdirSync, renameSync, unlinkSync } from "fs";
import ImageServiceContract from "../contracts/ImageServiceContract";


class ImageService implements ImageServiceContract {
    processImage(image: Express.Multer.File): string | null{
        const typesAccepts = ['image/jpeg', 'image/png', 'image/jpg'];
        const uploadDir = join(__dirname, '../../uploads');

        if(!typesAccepts.includes(image.mimetype)){
            unlinkSync(image.path);
            return null;
        }

        if(!existsSync(uploadDir)){
            mkdirSync(uploadDir);
        }

        const newImageName = image.originalname;
        const newImagePath = path.join(uploadDir, newImageName);

        renameSync(image.path, newImagePath);

        return newImageName;
    }

    deleteImage(filePath: string){
        const uploadDir = join(__dirname, '../../uploads');
        const fullPath = path.resolve(uploadDir, filePath);

        if(!existsSync(fullPath)){
            return 'Imagem não encontrada'
        }

        unlinkSync(fullPath);
    }
}

export default ImageService;