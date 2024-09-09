import { AlbumRepository } from "@/contexts/albums/domain/album.repository";
import { Injectable } from "@nestjs/common";
import { FindAlbumByIdDto } from "./find-album-by-id.dto";
import { AlbumPrimitives } from "@/contexts/albums/domain/album.entity";
import { AlbumNotFoundException } from "@/contexts/albums/domain/album-not-found.exception";

@Injectable()
export class FindAlbumByIdUseCase {
    constructor(private readonly albumRepository: AlbumRepository) {}

    async run(dto: FindAlbumByIdDto): Promise<{ album: AlbumPrimitives }> {
        const album = await this.albumRepository.findById(dto.id);

        if (!album) {
            throw new AlbumNotFoundException(dto.id);
        }
        
        return {
            album: album.toPrimitives()
        };
    }
}