import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import ErrorFilter from './error.filter';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});

  app.useGlobalFilters(new ErrorFilter());

  const PORT = process.env.PORT ?? 4001
  await app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}
bootstrap();
