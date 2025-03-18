import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './command/crear/create-user.command';
import { ApiTags, ApiBody, ApiOperation } from '@nestjs/swagger';
import { GetUsersQuery } from './queries/listar/get-users.query';
import { GetUserByIdQuery } from './queries/userById/get-user-by-id.query';

@ApiTags('users')
@Controller('user')
export class UserController {

    constructor(private readonly commandBus: CommandBus,  private readonly queryBus: QueryBus,
    ) { }

    @Post()
    @ApiOperation({ summary: 'Crear usuario' })
    @ApiBody({ schema: { properties: { name: { type: 'string' }, email: { type: 'string' } } } })
    async createUser(@Body('name') name: string, @Body('email') email: string) {
        return this.commandBus.execute(new CreateUserCommand(name, email));
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los usuarios' })
    async getUsers() {
      return this.queryBus.execute(new GetUsersQuery());
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un usuario por ID' })
    async getUserById(@Param('id') id: number) {
      return this.queryBus.execute(new GetUserByIdQuery(id));
    }
}
