import { Controller, Get, Param, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get('/:category/:fileType/:fileName')
  getFile(
    @Res() res,
    @Param('category') category: string,
    @Param('fileType') fileType: string,
    @Param('fileName') fileName: string,
  ) {
    return res.sendFile(
      this.filesService.findFile(category, fileType, fileName),
    );
  }
}
