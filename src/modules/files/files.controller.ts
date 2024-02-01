import { Response } from 'express';
import { Controller, Get, Param, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { ApiTags } from '@nestjs/swagger';
import { Swagger } from 'src/common/swagger/decorators/swagger.decorator';
import { filesDocumentation } from './docs/files.doc';

@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Swagger(filesDocumentation.getFile)
  @Get('/:category/:fileType/:fileName')
  getFile(
    @Res() res: Response,
    @Param('category') category: string,
    @Param('fileType') fileType: string,
    @Param('fileName') fileName: string,
  ) {
    return res.sendFile(
      this.filesService.findFile(category, fileType, fileName),
    );
  }
}
