import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateUserCommand } from "./create-user.command";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../user.entity";
import { Repository } from "typeorm";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    
  }

  async execute(command: CreateUserCommand): Promise<User> {
    const { name, email } = command;
    const user = this.userRepository.create({ name, email });
    return this.userRepository.save(user);
  }
}