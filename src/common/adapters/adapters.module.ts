import { Module } from '@nestjs/common';
import { Hasher } from './hasher.adapter';

@Module({
  providers: [Hasher],
  exports: [Hasher],
})
export class AdaptersModule {}
