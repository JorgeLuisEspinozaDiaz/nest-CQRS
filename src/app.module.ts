import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';



@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'database-1.car22e4gqefr.us-east-1.rds.amazonaws.com',
    port: 3306,
    username: 'admin',
    password: 'admin123',
    database: 'test',
    autoLoadEntities: true,
    synchronize: true,
  }), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static setupSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('Nest CQRS API')
      .setDescription('API con NestJS y CQRS usando MySQL')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }


 }
