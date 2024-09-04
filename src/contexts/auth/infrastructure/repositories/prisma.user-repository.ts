import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/user.repository';
import { User } from '../../domain/user.entity';
import { PrismaService } from '@/contexts/shared/prisma/prisma.service';

@Injectable()
export class PrismaUserRepository extends UserRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async save(user: User): Promise<void> {
    await this.prisma.user.create({ data: { ...user.toPrimitives() } });
  }
  async findById(uuid: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  async delete(uuid: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
