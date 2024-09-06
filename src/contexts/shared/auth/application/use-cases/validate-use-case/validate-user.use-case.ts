import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './login.dto';
import { UserRepository } from '../../../domain/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ValidateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async run(loginDto: LoginDto): Promise<{ id: string }> {
    const { username, password } = loginDto;

    const user = await this.userRepository.findByEmailOrUsername(username);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (!bcrypt.compareSync(password, user.toPrimitives().password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { id: user.toPrimitives().id };
  }
}
