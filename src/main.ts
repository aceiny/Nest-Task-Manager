import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { User, UserSchema } from './auth/auth.schema';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
