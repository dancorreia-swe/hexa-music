import { AlbumRepository } from "@/contexts/albums/domain/album.repository";
import { Injectable } from "@nestjs/common";
import { AlbumNotFoundException } from "@/contexts/albums/domain/album-not-found.exception";
import { RestoreAlbumDto } from "./restore-album.dto";

@Injectable()
export class RestoreAlbumUseCase {
    constructor(private readonly albumRepository: AlbumRepository) {}

    async run(dto: RestoreAlbumDto): Promise<{ data: string }> {
        const album = await this.albumRepository.findById(dto.id);

        if (!album) {
            throw new AlbumNotFoundException(dto.id);
        }
        
        await this.albumRepository.restore(dto.id);

        return {
            data: album.toPrimitives().id
        };
    }
}