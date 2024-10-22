import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "../../../domain/user.repository";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthenticateUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async run(
    userId: string,
  ): Promise<{ id: string; accessToken: string; refreshToken: string }> {
    const { accessToken, refreshToken } = await this.generateTokens(userId);

    return {
      id: userId,
      accessToken,
      refreshToken,
    };
  }

  private async generateTokens(userId: string) {
    const payload = { sub: userId };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, {
        secret: "supersecretkey",
        expiresIn: "1d",
      }),
    ]);

    return { accessToken, refreshToken };
  }
}
