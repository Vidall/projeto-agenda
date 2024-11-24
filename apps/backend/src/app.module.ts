import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DbModule } from './db/db.module';
import { EventoModule } from './evento/evento.module';

@Module({
  imports: [DbModule, EventoModule],
  controllers: [AppController],
})
export class AppModule {}
