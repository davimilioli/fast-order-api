interface ImageServiceContract {
    processImage(image: Express.Multer.File): string | null;
    deleteImage(filePath: string): any;
}

export default ImageServiceContract;