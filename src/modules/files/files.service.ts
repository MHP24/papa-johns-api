import { Injectable, NotFoundException } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  findFile(category: string, fileType: string, fileName: string) {
    const filePath = join(
      __dirname,
      `../../../static/${category}/${fileType}/${fileName}`,
    );
    if (!existsSync(filePath))
      throw new NotFoundException(`File: ${fileName} not found`);

    return filePath;
  }
}
