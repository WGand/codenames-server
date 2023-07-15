import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita CORS en la aplicación
  app.enableCors();

  await app.listen(8810);
}
bootstrap();