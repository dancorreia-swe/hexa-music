import { Controller, Get, NotFoundException, Param, UseGuards } from "@nestjs/common";
import { V1_ALBUM } from "../../route.constants";
import { FindAlbumByIdUseCase } from "@/contexts/albums/application/use-cases/find-by-id-use-case/find-album-by-id.use-case";
import { FindAlbumByIdHttpDto } from "./find-album-by-id.http-dto";
import { AlbumPrimitives } from "@/contexts/albums/domain/album.entity";
import { AlbumNotFoundException } from "@/contexts/albums/domain/album-not-found.exception";
import { JwtAuthGuard } from "@/contexts/shared/auth/application/guards/jwt.guard";

@UseGuards(JwtAuthGuard)
@Controller(V1_ALBUM)
export class FindAlbumByIdController {
    constructor (private readonly findAlbumByIdUseCase: FindAlbumByIdUseCase) {}

    @Get(":id")
    async run (@Param() dto: FindAlbumByIdHttpDto): Promise<{ album: AlbumPrimitives }> {
        try {
            return await this.findAlbumByIdUseCase.run({ id: dto.id });
        } catch (error) {
            if (error instanceof AlbumNotFoundException) {
                throw new NotFoundException(error.message);
            }

            throw error;
        }
    }
}