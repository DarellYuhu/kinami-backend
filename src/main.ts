import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { ZodValidationPipe } from 'nestjs-zod';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });

  app.useGlobalPipes(new ZodValidationPipe());

  const config = new DocumentBuilder().setTitle('Kinami API').build();
  const document = SwaggerModule.createDocument(app, config);
  app.use(
    '/reference',
    apiReference({ content: document, layout: 'classic', theme: 'laserwave' }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
