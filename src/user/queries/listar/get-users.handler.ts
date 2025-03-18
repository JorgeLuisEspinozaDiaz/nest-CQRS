import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetUsersQuery } from "./get-users.query";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../user.entity";
import { Repository } from "typeorm";

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(): Promise<User[]> {
    return this.userRepository.find();
  }
}