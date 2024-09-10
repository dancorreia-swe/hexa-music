import { Injectable } from "@nestjs/common";
import { AlbumRepository } from "../../domain/album.repository";
import { PrismaService } from "@/contexts/shared/prisma/prisma.service";
import { Album } from "../../domain/album.entity";

@Injectable()
export class PrismaAlbumRepository extends AlbumRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async save(album: Album): Promise<void> {
    await this.prisma.album.create({ data: { ...album.toPrimitives() } });
  }

  async findById(uuid: string): Promise<Album | null> {
    const album = await this.prisma.album.findUnique({
      where: { id: uuid },
    });

    return album ? new Album(album) : null;
  }

  async delete(uuid: string): Promise<void> {
    await this.prisma.album.update({
      where: { id: uuid },
      data: { deletedAt: new Date() },
    });
  }

  async destroy(uuid: string): Promise<void> {
    await this.prisma.album.delete({
      where: { id: uuid },
    });
  }

  async restore(uuid: string) {
    await this.prisma.album.update({
      where: { id: uuid },
      data: { deletedAt: null },
    });
  }
}
