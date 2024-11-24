import { Module } from '@nestjs/common';
import { PrismaProvider } from './PrismaProvider';

@Module({
  exports: [PrismaProvider],
  providers: [PrismaProvider]
})
export class DbModule {}
