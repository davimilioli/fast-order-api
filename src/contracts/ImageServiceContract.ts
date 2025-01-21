interface ImageServiceContract {
    processImage(image: Express.Multer.File): string | null
}

export default ImageServiceContract;