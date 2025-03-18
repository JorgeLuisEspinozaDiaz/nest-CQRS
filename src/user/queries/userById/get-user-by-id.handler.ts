import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetUserByIdQuery } from "./get-user-by-id.query";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/user/user.entity";

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(query: GetUserByIdQuery): Promise<User | null> {
    return this.userRepository.findOne({ where: { id: query.id } });
  }
}