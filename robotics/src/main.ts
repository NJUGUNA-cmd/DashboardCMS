import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Updated CORS configuration
  app.enableCors({
    origin: 'http://localhost:5173', // Exact match with your Vue frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type' ],
    credentials: false,

  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch(err=>{
  console.error('failed to start application:',err);
  process.exit(1);
});
