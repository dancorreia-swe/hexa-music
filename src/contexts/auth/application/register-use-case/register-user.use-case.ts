import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/user.repository';
import { RegisterUserDto } from './register-user.dto';
import { User, UserPrimitives } from '../../domain/user.entity';

@Injectable()
export class RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async run(registerDto: RegisterUserDto): Promise<{ user: UserPrimitives }> {
    const user = User.create(registerDto);

    await this.userRepository.save(user);

    return {
      user: user.toPrimitives(),
    };
  }
}
