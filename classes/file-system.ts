import { UploadedFile } from "express-fileupload";

import path from "path";
import fs from "fs";
import uniqid from "uniqid";

export default class FileSystem {
  constructor() {}

  saveTempImage(file: UploadedFile, userId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const path = this.createUserFolder(userId);
      const fileName = this.generateUniqueName(file.name);
      file.mv(`${path}/${fileName}`, (err) => {
        if (err) {
          console.error(err);
          reject(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  private createUserFolder(userId: string): string {
    const userPath = path.resolve(__dirname, "../uploads/", userId);
    const userTempPath = userPath + "/temp";

    if (!fs.existsSync(userPath)) {
      fs.mkdirSync(userPath);
      fs.mkdirSync(userTempPath);
    }

    return userTempPath;
  }

  private generateUniqueName(originalName: string): string {
    return `${uniqid()}.${originalName.split(".").pop()}`;
  }
}
