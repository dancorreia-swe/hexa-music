import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { V1_ALBUM } from "../../route.constants";
import { CreateAlbumUseCase } from "@/contexts/albums/application/use-cases/create-use-case/create-album.use-case";
import { CreateAlbumHttpDto } from "./create-album.http-dto";
import { AlbumPrimitives } from "@/contexts/albums/domain/album.entity";
import { JwtAuthGuard } from "@/contexts/shared/auth/application/guards/jwt.guard";

@UseGuards(JwtAuthGuard)
@Controller(V1_ALBUM)
export class CreateAlbumController {
  constructor(private readonly createAlbumUseCase: CreateAlbumUseCase) {}

  @Post()
  async run(
    @Body() dto: CreateAlbumHttpDto,
  ): Promise<{ album: AlbumPrimitives }> {
    return await this.createAlbumUseCase.run(dto);
  }
}
