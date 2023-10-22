import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as fs from 'node:fs';
import * as path from 'node:path';
import { File } from "./schemas/file.schema";
import { Model } from "mongoose";
import * as crypto from "node:crypto";

@Injectable()
export class FilesService {
  constructor(
    @InjectModel(File.name) private fileModel: Model<File>,
  ) {}
  async saveFile(filePath: string) {
    const hash_ = crypto.createHash("SHA256");
    hash_.setEncoding("hex");
    const fileData = await fs.promises.readFile(filePath);
    hash_.write(fileData)
    hash_.end();
    const hash = hash_.read();
    console.log(hash)
    const candidate = await this.fileModel.findOne({
      hash: hash
    });

    if (!candidate) {
      await fs.promises.copyFile(filePath, `./files/${hash}`);
      return await this.fileModel.create({
        hash,
      });
    }
    await fs.promises.rm(filePath)
    return candidate;
  }
}
