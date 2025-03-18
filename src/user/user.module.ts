import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CreateUserHandler } from './command/crear/create-user.handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { GetUsersHandler } from './queries/listar/get-users.handler';
import { GetUserByIdHandler } from './queries/userById/get-user-by-id.handler';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CqrsModule],
  providers: [CreateUserHandler, GetUsersHandler, GetUserByIdHandler],
  controllers: [UserController]
})
export class UserModule {}
