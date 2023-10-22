import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
  Param,
  Res,
  Response,
  StreamableFile
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import * as fs from 'node:fs';

import { FilesService } from "./files.service";
import {v4} from "uuid"
@Controller("files")
export class FilesController {
  constructor(private filesService: FilesService) {}
  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const pth = `./tmp/${v4()}`
    await fs.promises.writeFile(pth, file.buffer)
    return await this.filesService.saveFile(pth);
  }

  @Get(":hash")
  async download(@Param("hash") hash: string)  {
    // not found check
    
    return new StreamableFile(fs.createReadStream(`./files/${hash}`));
  }
}
