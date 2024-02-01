import { ApiParam } from '@nestjs/swagger';

const getFile = [
  ApiParam({
    name: 'category',
    type: String,
    required: true,
    description: 'Main category example: products',
  }),
  ApiParam({
    name: 'fileType',
    type: String,
    required: true,
    description: 'Global file type (img, video, audio)',
  }),
  ApiParam({
    name: 'fileName',
    type: String,
    required: true,
    description:
      'Unique file name for specific category and type **including extension**',
  }),
];

export const filesDocumentation = {
  getFile,
};
