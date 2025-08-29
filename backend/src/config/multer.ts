import multer from "multer";

const storage = multer.memoryStorage(); // guarda em memória para enviar ao Cloudinary
const upload = multer({ storage });

export default upload;
