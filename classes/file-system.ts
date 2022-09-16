import { UploadedFile } from "express-fileupload";

import path from "path";
import fs from "fs";
import uniqid from "uniqid";

export default class FileSystem {
  constructor() {}

  public saveTempImage(file: UploadedFile, userId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const path = this.getUserTempFolder(userId);
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

  public moveImagesToPosts(userId: string): string[] {
    const tempPath = this.getUserTempFolder(userId);
    const postsPath = path.resolve(__dirname, "../uploads/", userId, "posts");

    if (!fs.existsSync(tempPath)) {
      return [];
    }

    if (!fs.existsSync(postsPath)) {
      fs.mkdirSync(postsPath);
    }

    const tempImages = fs.readdirSync(tempPath) || [];

    tempImages.forEach((image) => {
      fs.renameSync(`${tempPath}/${image}`, `${postsPath}/${image}`);
    });

    return tempImages;
  }

  public getPhotoUrl(userId: string, img: string): string {
    const postsPath = path.resolve(__dirname, "../uploads/", userId, "posts");

    if (!fs.existsSync(`${postsPath}/${img}`)) {
      return path.resolve(__dirname, "../assets/no-image.png");
    }

    return `${postsPath}/${img}`;
  }

  private getUserTempFolder(userId: string): string {
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
