import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  const configService = await app.get(ConfigService);
  const port = configService.get('API_PORT');
  await app.listen(port);

  console.log(`🚀 Backend is running on http://localhost:${port}`);
}
bootstrap();
