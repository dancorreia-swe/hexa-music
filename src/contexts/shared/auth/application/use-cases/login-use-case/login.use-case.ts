import { Injectable } from '@nestjs/common';
import { LoginDto } from './login.dto';

@Injectable()
export class LoginUseCase {
  async run(loginDto: LoginDto): Promise<{ token: string }> {
    const token = 'token';
    return { token };
  }
}
