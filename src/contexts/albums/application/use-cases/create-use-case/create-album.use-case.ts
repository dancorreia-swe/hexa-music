import { Album, AlbumPrimitives } from "@/contexts/albums/domain/album.entity";
import { AlbumRepository } from "@/contexts/albums/domain/album.repository";
import { Injectable } from "@nestjs/common";
import { CreateAlbumDto } from "./create-album.dto";

@Injectable()
export class CreateAlbumUseCase {
  constructor(private readonly albumRepository: AlbumRepository) {}

  async run(dto: CreateAlbumDto): Promise<{ album: AlbumPrimitives }> {
    const album = Album.create(dto);

    await this.albumRepository.save(album);

    return {
      album: album.toPrimitives(),
    };
  }
}
