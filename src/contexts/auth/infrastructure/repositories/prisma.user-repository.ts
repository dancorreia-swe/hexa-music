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
    const user = await this.prisma.user.findUnique({ where: { id: uuid } });
    return user ? new User(user) : null;
  }

  async delete(uuid: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: uuid },
      data: { deletedAt: new Date() },
    });
  }

  async destroy(uuid: string): Promise<void> {
    await this.prisma.user.delete({ where: { id: uuid } });
  }
}
