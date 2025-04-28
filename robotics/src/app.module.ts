import { Module } from '@nestjs/common';
import{TypeOrmModule} from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RobotsModule } from './robots/robots.module';

@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host:process.env.DB_HOST||'localhost',
        port:parseInt(process.env.DB_PORT||'5432'),
        username:process.env.DB_USERNAME||'postgres',
        password:process.env.DB_PASSWORD||'Victorian1@@',
        database:process.env.DB_NAME||'robotics_db',
        entities:[__dirname+'/**/*.entity{.ts,.js}'],
        synchronize:process.env.NODE_ENV!=='production',//dont use in prod
      }),
    RobotsModule],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
