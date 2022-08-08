// Save file localy
import { diskStorage } from "multer";

type validFileExtension = "png" | "jpg" | "jpeg";
type validMimeType = "image/png" | "image/jpg" | "image/jpeg";

const validFileExtensions: validFileExtension[] = ["png", "jpg", "jpeg"];
const validMimeTypes: validMimeType[] = [
  "image/jpeg",
  "image/jpg",
  "image/png",
];

export const saveImageToStorage = {
  storage: diskStorage({
    destination: "./images",
    filename: (req, file, cb) => {
      const fileName: string = file.originalname;
      cb(null, fileName);
    },
  }),
  filter: (req, file, cb) => {
    const allowMimeTypes: validMimeType[] = validMimeTypes;
    validMimeTypes.includes(file.mimeType) ? cb(null, true) : cb(null, false);
  },
};
