import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const env = app.get(ConfigService);
    const port = env.get('APP_PORT');

    app.useGlobalPipes(new ValidationPipe());

    await app.listen(port);
    console.log(`${port}번 실행중...`);
}
bootstrap();
