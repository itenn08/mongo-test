import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";

import { storage } from "src/firebase/init";

@Injectable()
export class FileService {
  constructor() {}

  async downloadFile(fileName: string) {
    let exist = false;
    let signedUrl;

    const file = storage.file(fileName);

    const date = new Date();

    const config = {
      action: "read",
      expires: new Date(date.setMonth(date.getMonth() + 8)),
    };

    await file.exists().then(function (data) {
      exist = data[0];
    });

    if (exist) {
      await file.getSignedUrl(config as any).then(function (data) {
        signedUrl = data[0];
      });
    }

    return exist ? { url: signedUrl } : { error: "File not found" };
  }

  async uploadFile(file: Express.Multer.File, category: string) {
    try {
      if (!category) {
        throw new HttpException(
          "Please enter the category",
          HttpStatus.BAD_REQUEST
        );
      }
      console.log("file.path", file.path);
      const uploadedFile = await storage.upload(file.path, {
        destination: `${category}/${uuidv4()}${file.originalname}`,
        metadata: {
          contentType: file.mimetype,
          cacheControl: "public, max-age=31536000",
        },
      });
      return { path: uploadedFile[0].name };
    } catch (error) {
      return { error };
    }
  }
}
