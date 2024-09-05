import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './register-user.dto';
import { UserRepository } from '../../../domain/user.repository';
import { User, UserPrimitives } from '../../../domain/user.entity';

@Injectable()
export class RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async run(
    registerDto: RegisterUserDto,
  ): Promise<{ user: Omit<UserPrimitives, 'password'> }> {
    const user = User.create(registerDto);

    await this.userRepository.save(user);

    const { password, ...userWithoutPassword } = user.toPrimitives();
    return {
      user: userWithoutPassword,
    };
  }
}
