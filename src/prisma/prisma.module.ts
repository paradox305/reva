import { Global, Module } from '@nestjs/common';
import { DatabaseService, PrismaService } from './prisma.service';

@Global()
@Module({
  imports: [],
  providers: [PrismaService, DatabaseService],
  exports: [PrismaService, DatabaseService],
})
export class PrismaModule {}
