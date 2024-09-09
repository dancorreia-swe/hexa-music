import { Controller, Delete, Get, NotFoundException, Param, UseGuards } from "@nestjs/common";
import { V1_ALBUM } from "../../route.constants";
import { AlbumNotFoundException } from "@/contexts/albums/domain/album-not-found.exception";
import { JwtAuthGuard } from "@/contexts/shared/auth/application/guards/jwt.guard";
import { RestoreAlbumUseCase } from "@/contexts/albums/application/use-cases/restore-use-case/restore-album.use-case";
import { RestoreAlbumHttpDto } from "./restore-album.http-dto";

@UseGuards(JwtAuthGuard)
@Controller(V1_ALBUM)
export class RestoreAlbumController {
    constructor (private readonly restoreAlbumUseCase: RestoreAlbumUseCase) {}

    @Get(":id/restore")
    async run (@Param() dto: RestoreAlbumHttpDto): Promise<{ data: string }> {
        try {
            return await this.restoreAlbumUseCase.run({ id: dto.id });
        } catch (error) {
            if (error instanceof AlbumNotFoundException) {
                throw new NotFoundException(error.message);
            }

            throw error;
        }
    }
}