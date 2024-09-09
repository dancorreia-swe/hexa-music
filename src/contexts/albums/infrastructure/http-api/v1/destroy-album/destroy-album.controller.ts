import { Controller, Delete, NotFoundException, Param, UseGuards } from "@nestjs/common";
import { V1_ALBUM } from "../../route.constants";
import { AlbumNotFoundException } from "@/contexts/albums/domain/album-not-found.exception";
import { JwtAuthGuard } from "@/contexts/shared/auth/application/guards/jwt.guard";
import { DestroyAlbumHttpDto } from "./destroy-album.http-dto";
import { DestroyAlbumUseCase } from "@/contexts/albums/application/use-cases/destroy-use-case/destroy-album.use-case";

@UseGuards(JwtAuthGuard)
@Controller(V1_ALBUM)
export class DestroyAlbumController {
    constructor (private readonly destroyAlbumUseCase: DestroyAlbumUseCase) {}

    @Delete(":id")
    async run (@Param() dto: DestroyAlbumHttpDto): Promise<{ data: string }> {
        try {
            return await this.destroyAlbumUseCase.run({ id: dto.id });
        } catch (error) {
            if (error instanceof AlbumNotFoundException) {
                throw new NotFoundException(error.message);
            }

            throw error;
        }
    }
}