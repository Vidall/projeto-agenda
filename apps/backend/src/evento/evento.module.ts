import { Module } from '@nestjs/common';
import { EventoController } from './evento.controller';
import { EventoPrismaService } from './evento.prisma.service';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [EventoController],
  providers: [EventoPrismaService],
})
export class EventoModule {}
